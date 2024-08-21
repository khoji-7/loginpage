import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function modelsPage() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenbek");
        navigate("/");
    };

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
            .then((response) => response.json())
            .then((item) => setData(item?.data)) 
            .catch((error) => console.error("Error:", error));
    }, [refresh]);
    
    const [openModal, setOpenModal] = useState(false);
    const modalFunc = () => {
        setOpenModal(true);
        setName("");
        setBrand("lamborghini"); // Default value for select
    };

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("lamborghini"); // Default value for select
   
    const createCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand_id", brand);

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
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
                console.log(dat?.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("Something went wrong, please try again.");
        });
    };

    const deleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
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
    const [editBrand, setEditBrand] = useState("");

    const editModalFunc = (id, name, brand) => {
        setOpenModal(false);
        setEditModal(true);
        setEditId(id);
        setEditName(name);
        setEditBrand(brand);
    };

    const editFunc = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", editName);
        formData.append("brand_id", editBrand);

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${editId}`, {
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
                    <h1>Add Category</h1>
                    <form onSubmit={createCategory}>
                        <input 
                            type="text" 
                            value={name} 
                            required 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)} 
                        />
                        <select 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)} 
                            required
                        >
                            <option value="lamborghini">Lamborghini</option>
                            <option value="audi">Audi</option>
                            <option value="mercedes_benz">Mercedes Benz</option>
                            <option value="uz_auto_ravon">Uz Auto Ravon</option>
                        </select>
                        <button type="submit" className="homePageBtn">
                            Add
                        </button>
                    </form>
                    <button className="homePageBtn" onClick={() => setOpenModal(false)}>Close</button>
                </div>
            )}

            {editModal && (
                <div className="modal">
                    <h1>Edit Category</h1>
                    <form onSubmit={editFunc}>
                        <input 
                            type="text" 
                            value={editName} 
                            required 
                            placeholder="Name" 
                            onChange={(e) => setEditName(e.target.value)} 
                        />
                        <select 
                            value={editBrand} 
                            onChange={(e) => setEditBrand(e.target.value)} 
                            required
                        >
                            <option value="lamborghini">Lamborghini</option>
                            <option value="audi">Audi</option>
                            <option value="mercedes-benz">Mercedes Benz</option>
                            <option value="uz_auto_ravon">Uz Auto Ravon</option>
                        </select>
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
                        <th>Name</th>
                        <th>Brand</th>
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
                            <td>{item?.brand_title}</td>
                            <td>
                                <button className="statusBtn" onClick={() => deleteCategory(item?.id)}>
                                    <DeleteIcon/>
                                </button>
                            </td>
                            <td>
                                <button className="statusBtn" onClick={() => editModalFunc(item?.id, item?.name, item?.brand_title)}>
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

export default modelsPage;
