import { useNavigate } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        .catch((error) => console.error("Error:", error));
    };

    return (
        <>
            home page
            <button onClick={logout}>log Out</button>
            <button onClick={modalFunc}>modal ochish</button>
            {openModal && (
                <div className="modal">
                    <h1>modal</h1>
                    <form onSubmit={createCategory}>
                        <input type="text" required placeholder="name en" onChange={(e) => setNameEn(e?.target?.value)} />
                        <input type="text" required placeholder="name ru" onChange={(e) => setNameRu(e?.target?.value)} />
                        <input type="file" required placeholder="img" onChange={(e) => setImg(e?.target?.files[0])} accept="image/png, image/jpeg" />
                        <button type="submit">
                            qoshish
                        </button>
                    </form>
                    <button onClick={() => setOpenModal(false)}>Close</button>
                </div>
            )}
            <table id="customers">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, i) => (
                        <tr key={i}>
                            <td>{item?.name_en}</td>
                            <td>{item?.name_ru}</td>
                            <td>
                                <img
                                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                                    alt=""
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default HomePage;
