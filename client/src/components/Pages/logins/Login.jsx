
import { useState } from "react"
import {loginUser} from "../../../services/user.services"
import key from "../../../services/keys.json"

const Login = () =>{

    

    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState(false)
    const handlerInput = (e) =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }   
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        
        const token = await loginUser(user)
        if(token !== undefined){
            console.log(token)
            window.localStorage.setItem(key.KEYTOKEN,token)
            window.location.reload()
        }else{
            setError(true)
        }
        
        
    }
    
    return(
        <div className="container-login">
            <div className="container-login-form">
                <div className="container-login-image">
                    <img src="./logo.png" alt="logo" className="logo-imagen"/>
                </div>

                <div className="container-login-input" >
                    <h1>BIENVENIDO USUARIO</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">email</label>
                        <input type="text"
                            id="email"
                            name="email"
                            onChange={handlerInput} 
                            value={user.email}
                            className="input-login"
                            style={error?{borderColor:"red", borderWidth:1}:null} />
                        
                        <label htmlFor="password">contraseña</label>
                        <input type="password"
                            id="password"
                            name="password"
                            onChange={handlerInput}
                            value={user.password}
                            className="input-login"
                            style={error?{borderColor:"red", borderWidth:1}:null}
                            />
                            {error ? (<span style={{color:"red", marginTop:-20, marginBottom:10}}>credenciales no validas</span>): null}
                            
                        <button className="button-login" type="submit">Login</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login