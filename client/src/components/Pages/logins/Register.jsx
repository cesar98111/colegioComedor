
import { useState } from "react"
import {registerFirstUser}  from "../../../services/user.services"


const Register = ()=>{

    const [user, setUser] = useState({
        name:"",
        lastName:"",
        email:"",
        password:""
    })
    
    const handlerInputChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = async (e) =>{
        e.preventDefault()
        
        await registerFirstUser(user)
        window.location.reload()
    }
    return(
        <div className="container-login">
        <div className="container-login-form">
            <div className="container-login-image">
                <img src="./logo.png" alt="logo" className="logo-imagen"/>
            </div>

            <div className="container-login-input" >
                <h1>CREACIÓN DE NUEVO USUARIO</h1>
                <form className="login-form" onSubmit={handlerSubmit}>
                    <label htmlFor="nombre">nombre</label>
                    <input type="text" 
                        id="nombre"
                        name="name"
                        className="input-login"
                        value={user.name}
                        onChange={handlerInputChange} />

                    <label htmlFor="apellidos">apellidos</label>
                    <input type="text"
                        id="apellidos"
                        name="lastName"
                        value={user.lastName}
                        onChange={handlerInputChange}
                        className="input-login"/>

                    <label htmlFor="email">email</label>
                    <input type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handlerInputChange}
                        className="input-login" />

                    <label htmlFor="contraseña">contraseña</label>
                    <input type="password"
                        id="contraseña"
                        name="password"
                        value={user.password}
                        onChange={handlerInputChange}
                        className="input-login"/>

                    <button className="button-login" type="submit">enviar datos</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Register