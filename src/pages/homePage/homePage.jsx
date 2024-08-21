import { useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function HomePage() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenbek");
        navigate("/");
    };

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
            .then((response) => response.json())
            .then((item) => setData(item?.data))
            .catch((error) => console.error("Error:", error));
    }, [refresh]);

    const [openModal, setOpenModal] = useState(false);
    const modalFunc = () => {
        setOpenModal(true);
        // Formani tozalash
        setNameEn("");
        setNameRu("");
        setImg(null);
    };

    const [nameEn, setNameEn] = useState("");
    const [nameRu, setNameRu] = useState("");
    const [img, setImg] = useState(null);

    const createCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name_en", nameEn);
        formData.append("name_ru", nameRu);
        formData.append("images", img);

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
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
            fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
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
    const [editNameEn, setEditNameEn] = useState("");
    const [editNameRu, setEditNameRu] = useState("");
    const [editImg, setEditImg] = useState(null);

    const editModalFunc = (id, nameEn, nameRu, img) => {
        setOpenModal(false);
        setEditModal(true);
        setEditId(id);
        setEditNameEn(nameEn);
        setEditNameRu(nameRu);
        setEditImg(img);
    };

    const editFunc = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name_en", editNameEn);
        formData.append("name_ru", editNameRu);
        if (editImg) {
            formData.append("images", editImg);
        }

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${editId}`, {
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
                        <input type="text" value={nameEn} required placeholder="Name EN" onChange={(e) => setNameEn(e.target.value)} />
                        <input type="text" value={nameRu} required placeholder="Name RU" onChange={(e) => setNameRu(e.target.value)} />
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
                        <input type="text" value={editNameEn} required placeholder="Name EN" onChange={(e) => setEditNameEn(e.target.value)} />
                        <input type="text" value={editNameRu} required placeholder="Name RU" onChange={(e) => setEditNameRu(e.target.value)} />
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
                            <td>{item?.name_en}</td>
                            <td>{item?.name_ru}</td>
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
                                <button className="statusBtn" onClick={() => editModalFunc(item?.id, item?.name_en, item?.name_ru, item?.image_src)}>
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
