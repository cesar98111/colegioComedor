import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { upadatePassword } from "../../../services/user.services"
import key from "../../../services/keys.json"


const PasswordUpdate = () =>{
    const navigate = useNavigate()
    const {id} = useParams()
    const [password, setPassword] = useState({
        password:"",
        repeatPassword:""
    })
    const token = window.localStorage.getItem(key.KEYTOKEN)

    const handlerPassword = (e) =>{
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        })
    }

    const handlerSubmitPassword = async (e) =>{
        e.preventDefault()
        if(password.password !== "" && password.repeatPassword !== ""){
            if(password.password ===  password.repeatPassword){
                await upadatePassword(password,id,token)
                navigate("/user")
            }else{
                window.alert("las contraseñas tienen que coincidir")
            }
        }else{
            window.alert("faltan parametros")
        }

    }

    return(
        <div className="containerUsers">
            <h2 className="passwordTitle">introduce la nueva contraseña</h2>
            <div className="passwordContainer">
                <form onSubmit={handlerSubmitPassword} className="passwordForm">
                    <label htmlFor="password" style={{textAlign: "center", }}> nueva contraseña </label>
                    <input type="password" 
                            name="password"
                            placeholder="contraseña" 
                            id="password"
                            className="inputsPassword"
                            onChange={handlerPassword}
                            value={password.password}/>
                    <label htmlFor="passworRepeat" style={{textAlign: "center", }}> Repita la contraseña </label>
                    <input type="password"
                            name="repeatPassword"
                            placeholder="repetir contraseña"
                            id="passwordRepeat"
                            className="inputsPassword"
                            onChange={handlerPassword}
                            value={password.repeatPassword} />
                    
                    <button className="buttonPasswordConfirm" type="submit">confirmar</button>
                </form>
                
            </div>
        </div>
    )
}
export default PasswordUpdate