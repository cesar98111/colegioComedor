import { useState, useEffect } from "react"
import {getUser} from "../../services/user.services"
import key from "../../services/keys.json"
import { Link, useNavigate } from "react-router-dom"

const Navbar = ({token}) =>{
    const [user, setUser] =useState()
    const navigate = useNavigate()
    useEffect(()=>{
        const getUsers = async () =>{
            setUser(await getUser(window.localStorage.getItem(key.KEYTOKEN)))
            
            
        }

        getUsers()
    },[])
    const logout = ()=>{
        window.localStorage.removeItem(key.KEYTOKEN)
        navigate("/")
        window.location.reload()
    }
    return(
        <div className="navbar-container">
            {
                user !== undefined ?
                <span className="userName">{user.nombre} {user.apellidos}</span>
                :
                <span>loading ...</span>
            }
            {
                user !== undefined ?

                user.roles === "ADMIN" ?
                <div className="container-link" style={{marginRight:10}}>
                    <Link className="links" to="/user">Usuarios</Link>
                    <Link className="links" to="/students">Alumnos</Link>
                    <Link className="links" to="/">Inicio</Link>
                    <Link onClick={()=>logout()} className="links" style={{backgroundColor:"red",borderRadius:10,width:50}}> 
                        <img src="/exit.png" style={{height:20}}  alt="" />
                    </Link>
                </div>
                :
                <div className="container-link">
                    <Link className="links" to="/">inicio</Link>
                    <Link onClick={()=>logout()} className="links" style={{backgroundColor:"red",borderRadius:10,width:50}}> 
                        <img src="/exit.png" style={{height:20}} alt="" />
                    </Link>
                </div>
                :
                <div className="container-link">
                    load
                </div>

            }
            
            
        </div>
    )
}

export default Navbar