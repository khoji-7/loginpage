import { useNavigate } from "react-router-dom"
function HomePage(){

    let navigate = useNavigate()
    const logout = () =>{
        localStorage.removeItem("tokenbek")
        navigate("/")
    }
    return(
        <>
        home page
        <button onClick={logout}>
            log Out
        </button>
        </>
    )
}
export default HomePage