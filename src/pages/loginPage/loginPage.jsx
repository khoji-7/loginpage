import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function LoginPage(){
    const [ number, setnumber ] = useState()
    const [ pasword, setpasword] = useState() 
    const navigate = useNavigate( )


    const login =( event) => {
        event.preventDefault();
        
        console.log(number,pasword);

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number: number,
                password: pasword
            })
            
        }).then((data) => data.json())
        .then((elem) => {
           if(elem?.success === true){
            toast.success(elem?.message)
            localStorage.setItem("tokenbek",elem?.data?.tokens?.accessToken?.token)
            navigate("/home")
           }
           else{
            toast.error(elem?.message)
           }
        })
        .catch((error) => console.error('Error:', error))

    }
    return(
        <>
        <form onSubmit={login}>
            <input type="text" onChange={(e)=> setnumber(e?.target?.value)} required minLength={3}/>
            <input type="text" onChange={(e)=> setpasword(e?.target?.value)}  required minLength={3} />
            <button>
                login 
            </button>
        </form>
        </>
    )
}
export default LoginPage