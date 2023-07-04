import { useEffect, useState } from "react"
import key from "../../../services/keys.json"
import * as serviceUsers from "../../../services/user.services"
import { Link, useNavigate, useParams } from "react-router-dom"
const AddUsers = () =>{
    const navigate = useNavigate()
    const{id} = useParams()
    const [token, setToken] = useState(window.localStorage.getItem(key.KEYTOKEN))
    const [newUser, setNewUser] = useState({
        nombre:null,
        apellidos:"",
        email:"",
        rol:"",
        contraseña:"",
        contraseñaRepetida:""
    })
    useEffect(()=>{    
        
        const getUser = async() =>{
            if(id){
                console.log(token)
                const data = await serviceUsers.getUserById(id,token)
                setNewUser({
                    ...newUser,
                    nombre:data.nombre,
                    apellidos:data.apellidos,
                    email:data.email,
                    rol:data.roles
                })
            }
        }
        getUser()
    },[])

    const handlerInputs = (e) =>{
        setNewUser({
            ...newUser,
            [e.target.name]:e.target.value
        })
    }
    
    const handlerAddUser = async (e) =>{
        e.preventDefault()
        if(newUser.nombre === "" || newUser.apellidos==="" || newUser.email==="" ){
            window.alert("faltan campos a rellenar")
           
        }else{
            if(id){
                await serviceUsers.updateUserId(id,token,newUser)
                navigate('/user')
            }else{
                if(newUser.contraseña!== "" && newUser.contraseña === newUser.contraseñaRepetida){
                    await serviceUsers.resgisterUser(newUser,token)
                    navigate('/user')
                }else{
                    window.alert("las contraseñas no coinciden")
                }
            }
            
        }
        

    }
    const renderOption = () =>{
        console.log(newUser.rol)
        if(id){
            return(
                <>  
                    <option value="ADMIN" selected={newUser.rol ==="ADMIN" ? "true":"false"} >Administrador</option>
                    <option value="USER" selected={newUser.rol ==="USER"?"true":"false"}>Usuario</option>
                </>
            )
        }else{
            return(
                <>
                    <option selected="true" disabled="disabled">seleciona un rol</option>
                    <option value="ADMIN">administrador</option>
                    <option value="USER">usuario</option>
                </>
            )
        }
    }
    return(
        <div className="containerUsers" style={{justifyContent:"center"}}>
            <div className="containerAddUsers">
                <form onSubmit={handlerAddUser}>
                    <div className="userForm">
                        <div className="inputUsers">
                            <div style={{width:"30%"}} >
                                <p>
                                    <label htmlFor="nombre" >nombre</label>
                                    <input type="text"
                                     placeholder="nombre"
                                     id="nombre"
                                     name="nombre"
                                     value={newUser.nombre}
                                     onChange={handlerInputs}/>
                                </p>
                                <p>
                                    <label htmlFor="apellidos">apellidos</label>
                                    <input type="text" 
                                    placeholder="apellidos"
                                    name="apellidos"
                                    id="apellidos"
                                    value={newUser.apellidos}
                                    onChange={handlerInputs} />
                                </p>
                                <p>
                                    <label htmlFor="email">email</label>
                                    <input type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="email"
                                    value={newUser.email}
                                    onChange={handlerInputs}/>
                                </p>
                            </div>
                            <div style={{width:"30%", height:200}}>
                                <p>
                                    <select name="rol" id="rol" onChangeCapture={handlerInputs}>
                                        {renderOption()}
                                    </select>
                                </p>
                                {
                                    !id ? 
                                    <>
                                        <p>
                                            <label htmlFor="password">contraseña</label>
                                            <input type="password" 
                                            name="contraseña" 
                                            id="password" 
                                            placeholder="contraseña"
                                            value={newUser.contraseña}
                                            onChange={handlerInputs}/>
                                        </p>
                                        <p>
                                            <label htmlFor="">repetir contraseña</label>
                                            <input type="password"
                                                placeholder="repetir contraseña"
                                                name="contraseñaRepetida"
                                                id="password"
                                                value={newUser.contraseñaRepetida}
                                                onChange={handlerInputs}
                                                />
                                        </p>
                                    </>
                                    :
                                    <Link className="passwordButton" to={`/user/password/${id}`}>cambiar contraseña</Link>
                                }
                                
                            </div>
                        </div>
                        <div className="UsersButton">
                            <button className="userAddButton" type="submit"> añadir</button>
                        </div>
                    </div>
                    
                </form>
            </div>  
        </div>
    )
}

export default AddUsers