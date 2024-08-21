import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Token } from "@mui/icons-material";

function HomePage() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenbek");
        navigate("/");
    };

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
            .then((response) => response.json())
            .then((item) => setData(item?.data))
            .catch((error) => console.error("Error:", error));
    }, [refresh]);
    const [openModal, setOpenModal] = useState(false);
    const modalFunc = () => {
        setOpenModal(true);
        setName("");
        setText("");
        setImg(null);
    };

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const createCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("text", text);
        formData.append("images", img);

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenbek')}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((dat) => {
                if (dat?.success === true) {
                    toast.success(dat?.message);
                    setOpenModal(false);
                    setRefresh(!refresh);
                } else {
                    toast.error(dat?.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Something went wrong, please try again.");
            });
    };

    const deleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokenbek')}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Category deleted successfully.");
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Failed to delete category.");
            });
        }
    };

    const [editId, setEditId] = useState();
    const [editModal, setEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editText, setEditText] = useState("");
    const [editImg, setEditImg] = useState(null);

    const editModalFunc = (id, name, text, img) => {
        setOpenModal(false);
        setEditModal(true);
        setEditId(id);
        setEditName(name);
        setEditText(text);
        setEditImg(img);
    };

    const editFunc = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", editName);
        formData.append("text", editText);
        if (editImg) {
            formData.append("images", editImg);
        }

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${editId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenbek')}`,
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((elem) => {
            toast.success("Category updated successfully.");
            setEditModal(false);
            setRefresh(!refresh);
        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("Failed to update category.");
        });
    };

    return (
        <div className="homeContainer">
            {(openModal || editModal) && <div className="modal-overlay"></div>}

            {openModal && (
                <div className="modal">
                    <h1>Modal</h1>
                    <form onSubmit={createCategory}>
                        <input type="text" value={name} required placeholder="Name " onChange={(e) => setName(e.target.value)} />
                        <input type="text" value={text} required placeholder="text" onChange={(e) => setText(e.target.value)} />
                        <input type="file" onChange={(e) => setImg(e.target.files[0])} accept="image/png, image/jpeg" />
                        <button type="submit" className="homePageBtn">
                            Add
                        </button>
                    </form>
                    <button className="homePageBtn" onClick={() => setOpenModal(false)}>Close</button>
                </div>
            )}

            {editModal && (
                <div className="modal">
                    <h1>Edit</h1>
                    <form onSubmit={editFunc}>
                        <input type="text" value={editName} required placeholder="Name " onChange={(e) => setEditName(e.target.value)} />
                        <input type="text" value={editText} required placeholder="Text" onChange={(e) => setEditText(e.target.value)} />
                        <input type="file" onChange={(e) => setEditImg(e.target.files[0])} accept="image/png, image/jpeg" />
                        <button type="submit" className="homePageBtn">
                            Edit
                        </button>
                    </form>
                    <button className="homePageBtn" onClick={() => setEditModal(false)}>Close</button>
                </div>
            )}

            <table id="customers">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>
                            <button className="homePageBtn" onClick={modalFunc}>Add</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.name}</td>
                            <td>{item?.text}</td>
                            <td>
                                <img className="tdImage"
                                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                                    alt=""
                                />
                            </td>
                            <td>
                                <button className="statusBtn" onClick={() => deleteCategory(item?.id)}>
                                    <DeleteIcon/>
                                </button>
                            </td>
                            <td>
                                <button className="statusBtn" onClick={() => editModalFunc(item?.id, item?.name, item?.text, item?.image_src)}>
                                    <EditIcon/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;
