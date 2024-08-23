import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CarsPage() {
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenbek");
        navigate("/");
    };

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [brands, setBrands] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [models, setModels] = useState([]);

    // Fetch cars data
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
            .then((response) => response.json())
            .then((item) => setData(item?.data || []))
            .catch((error) => console.error("Error:", error));
    }, [refresh]);

    // Fetch brands data
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((response) => response.json())
            .then((item) => setBrands(item?.data || []))
            .catch((error) => console.error("Error:", error));
    }, []);

    // Fetch locations data
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
            .then((response) => response.json())
            .then((item) => setLocations(item?.data || []))
            .catch((error) => console.error("Error:", error));
    }, []);

    // Fetch categories data
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
            .then((response) => response.json())
            .then((item) => setCategories(item?.data || []))
            .catch((error) => console.error("Error:", error));
    }, []);

    // Fetch cities data
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
            .then((response) => response.json())
            .then((item) => setCities(item?.data || []))
            .catch((error) => console.error("Error:", error));
    }, []);

    // Fetch models data
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
            .then((response) => response.json())
            .then((item) => setModels(item?.data || []))
            .catch((error) => console.error("Error:", error));
    }, []);

    const [openModal, setOpenModal] = useState(false);
    const modalFunc = () => {
        setOpenModal(true);
        setName("");
        setBrand(""); // Reset to default value
    };
    console.log(data);

    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [second, setSecond] = useState("");
    const [speed, setSpeed] = useState("");
    const [people, setPeople] = useState("");
    const [motor, setMotor] = useState("");
    const [transmission, setTransmission] = useState("");
    const [side, setSide] = useState("");
    const [petrol, setPetrol] = useState("");
    const [day, setDay] = useState("");
    const [deposite, setDeposite] = useState("");
    const [priceAed, setPricaAed] = useState("");
    const [priceAedIn, setPriceAedIn] = useState("");
    const [priceUs, setPricaUs] = useState("");
    const [priceUsIn, setPriceUsIn] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
















    const createCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand_id", selectedBrand);
        formData.append("model_id", selectedModel);
        formData.append("location_id", selectedLocation);
        formData.append("city_id", selectedCity);
        formData.append("category_id", selectedCategory);
        formData.append("color", color);
        formData.append("year", year);
        formData.append("seconds", second);
        formData.append("max_speed", speed);
        formData.append("max_people", people);
        formData.append("motor", motor);
        formData.append("transmission", transmission);
        formData.append("drive_side", side);
        formData.append("petrol", petrol);
        formData.append("limitperday", day);
        formData.append("deposit", deposite);
        formData.append("price_in_aed", priceAed);
        formData.append("price_in_aed_sale", priceAedIn);
        formData.append("price_in_usd", priceUs);
        formData.append("price_in_usd_sale", priceUsIn);
        formData.append("premium_protection", price);
        if (image) formData.append("car_images[0]?.image", image);
        if (image1) formData.append("car_images[1]?.image", image1);
        if (image2) formData.append("car_images[2]?.image", image2);

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenbek')}`,
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((dat) => {
            if (dat?.success) {
                toast.success(dat?.message);
                setOpenModal(false);
                setRefresh(!refresh);
            } else {
                toast.error(dat?.message || "Failed to create category.");
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
                if (data?.success) {
                    toast.success("Category deleted successfully.");
                    setRefresh(!refresh);
                } else {
                    toast.error("Failed to delete category.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Failed to delete category.");
            });
        }
    };

    const [editId, setEditId] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [editName, setEditName] = useState("");
    const [editBrand, setEditBrand] = useState("");

    const editModalFunc = (setEditBrand, setEditCategory, setEditModel,setEditLocation,setEditCity,setEditColor,setEditYear,setEditSecond,setEditSpeed,setEditPeople,setEditMotor,setEditTransmission,setEditSide) => {
        const model = item.data;
        setEditBrand(model.brand_id);
        setEditCategory(model.category_id);
        setEditModel(model.model_id);
        setEditLocation(model.location_id);
        setEditCity(model.city_id);
        setEditColor(model.color);
        setEditYear(model.year);
        setEditSecond(model.seconds);
        setEditSpeed(model.max_speed);
        setEditPeople(model.max_people);
        setEditMotor(model.motor);
        setEditTransmission(model.transmission);
        setEditSide(model.drive_side);
        setEditPetrol(model.petrol);
        setEditDay(model.limitperday);
        setEditDeposite(model.deposit);
        setEditPriceAed(model.price_in_aed);
        setEditPriceAedIn(model.price_in_aed_sale);
        setEditPriceUs(model.price_in_usd);
        setEditPriceUsIn(model.price_in_usd_sale);
        setEditPrice(model.premium_protection);
        setEditImage(model.car_images[0]?.image || "");
        setEditImage1(model.car_images[1]?.image || "");
        setEditImage2(model.car_images[2]?.image || "");
    };

    const editFunc = (e) => {
        e.preventDefault();

       
        const formData = new FormData();
        formData.append("brand_id", editBrand);
        formData.append("model_id", editModel);
        formData.append("location_id", editLocation);
        formData.append("city_id", editCity);
        formData.append("category_id", editCategory);
        formData.append("color", editColor);
        formData.append("year", editYear);
        formData.append("seconds", editSecond);
        formData.append("max_speed", editSpeed);
        formData.append("max_people", editPeople);
        formData.append("motor", editMotor);
        formData.append("transmission", editTransmission);
        formData.append("drive_side", editSide);
        formData.append("petrol", editPetrol);
        formData.append("limitperday", editDay);
        formData.append("deposit", editDeposite);
        formData.append("price_in_aed", editPriceAed);
        formData.append("price_in_aed_sale", editPriceAedIn);
        formData.append("price_in_usd", editPriceUs);
        formData.append("price_in_usd_sale", editPriceUsIn);
        formData.append("premium_protection", editPrice);
        if (editImage) formData.append("car_images[0]?.image", editImage);
        if (editImage1) formData.append("car_images[1]?.image", editImage1);
        if (editImage2) formData.append("car_images[2]?.image", editImage2);

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${editId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenbek')}`,
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((elem) => {
            if (elem?.success) {
                toast.success("Category updated successfully.");
                setEditModal(false);
                setRefresh(!refresh);
            } else {
                toast.error("Failed to update category.");
            }
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
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            required
                        >
                            <option value="">Select a category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name_en}
                                </option>
                            ))}
                        </select>
                        <select 
                            value={selectedBrand} 
                            onChange={(e) => setSelectedBrand(e.target.value)} 
                            required
                        >
                            <option value="">Select a Brand</option>
                            {brands?.map((brandItem) => (
                                <option key={brandItem.id} value={brandItem.id}>
                                    {brandItem.title}
                                </option>
                            ))}
                        </select>
                        <select 
                            value={selectedModel} 
                            onChange={(e) => setSelectedModel(e.target.value)} 
                            required
                        >
                            <option value="">Select a model</option>
                            {models?.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                        <select 
                            value={selectedLocation} 
                            onChange={(e) => setSelectedLocation(e.target.value)} 
                            required
                        >
                            <option value="">Select a location</option>
                            {locations?.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                        <select 
                            value={selectedCity} 
                            onChange={(e) => setSelectedCity(e.target.value)} 
                            required
                        >
                            <option value="">Select a city</option>
                            {cities?.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                       
                        <input 
                            type="text" 
                            value={color} 
                            required 
                            placeholder="color" 
                            onChange={(e) => setColor(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            min={4}
                            value={year} 
                            required 
                            placeholder="yili" 
                            onChange={(e) => setYear(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={second} 
                            required 
                            placeholder="second" 
                            onChange={(e) => setSecond(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={speed} 
                            required 
                            placeholder="spped" 
                            onChange={(e) => setSpeed(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={people} 
                            required 
                            placeholder="people" 
                            onChange={(e) => setPeople(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={motor} 
                            required 
                            placeholder="motor" 
                            onChange={(e) => setMotor(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={transmission} 
                            required 
                            placeholder="transmission" 
                            onChange={(e) => setTransmission(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={side} 
                            required 
                            placeholder="side" 
                            onChange={(e) => setSide(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={petrol} 
                            required 
                            placeholder="petrol" 
                            onChange={(e) => setPetrol(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={day} 
                            required 
                            placeholder="day" 
                            onChange={(e) => setDay(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={deposite} 
                            required 
                            placeholder="deposite" 
                            onChange={(e) => setDeposite(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={price} 
                            required 
                            placeholder="price " 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={priceAed} 
                            required 
                            placeholder="priceAed" 
                            onChange={(e) => setPricaAed(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={priceAedIn} 
                            required 
                            placeholder="priceAedIN" 
                            onChange={(e) => setPriceAedIn(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={priceUs} 
                            required 
                            placeholder="priceAedIN" 
                            onChange={(e) => setPricaUs(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            value={priceUsIn} 
                            required 
                            placeholder="priceAedIN" 
                            onChange={(e) => setPriceUsIn(e.target.value)} 
                        />
                     <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/png, image/jpeg" />
                     <input type="file" onChange={(e) => setImage1(e.target.files[0])} accept="image/png, image/jpeg" />
                     <input type="file" onChange={(e) => setImage2(e.target.files[0])} accept="image/png, image/jpeg" />
                        
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
                            <option value="">Select a Brand</option>
                            {brands?.map((brandItem) => (
                                <option key={brandItem.id} value={brandItem.id}>
                                    {brandItem.title}
                                </option>
                            ))}
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
                        <th>Brand</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>
                            <button className="homePageBtn" onClick={modalFunc}>Add</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.brand?.title}</td>
                            <td>{item?.model?.name}</td>
                            <td>{item?.color}</td>
                            <td>{item?.city?.name}</td>
                            <td>
                                <button className="statusBtn" onClick={() => deleteCategory(item?.id)}>
                                    <DeleteIcon/>
                                </button>
                            </td>
                            <td>
                                <button className="statusBtn" onClick={() => editModalFunc(item?.id, item?.name, item?.brand_id)}>
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

export default CarsPage;
