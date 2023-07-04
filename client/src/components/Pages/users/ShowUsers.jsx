import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as userServices from "../../../services/user.services"
import key from "../../../services/keys.json"
import Pagination from "../../pagination/pagination"

const ShowUsers = () =>{
    const [users, setUsers] = useState([])
    const [loadUser, setLoadUser] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const nRenderPage = 5
    const [token, setToken] = useState()
    const [shearch, setShearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(()=>{
        const getUsers =async () =>{
            setToken(window.localStorage.getItem(key.KEYTOKEN))
            setUsers(await userServices.getAllUserss(window.localStorage.getItem(key.KEYTOKEN)))
            setLoadUser(await userServices.getAllUserss(window.localStorage.getItem(key.KEYTOKEN)))
            setCurrentUser(await userServices.getUser(window.localStorage.getItem(key.KEYTOKEN)))
        }

        getUsers()
    },[])

    const maxPage = currentPage * nRenderPage
    const minPage = maxPage - nRenderPage
    const nameHandler = (e) =>{
        const name = e.target.value

        setShearch(e.target.value)
        if(name !== ""){
            setLoadUser(users.filter((value)=>{return value.nombre.startsWith(name)}))
        }else{
            setLoadUser(users)
        }
        
        
    }

    const sendShearchHandler = async (e) =>{
        e.preventDefault()
        if(shearch !== ""){
            setLoadUser(await userServices.getUserByName(shearch,window.localStorage.getItem(key.KEYTOKEN)))
        }else{
            setLoadUser(users)
        }
        
        console.log(users)

    }
    const deleteUsersHandler = async (idUser) =>{
        console.log(idUser)
        await userServices.deleteUser(idUser,token)
        setUsers(users.filter((value)=> value.idusuario !== idUser))
        window.location.reload()
        
    }
    const renderUsers = () =>{
        return(
            currentUser&&
            loadUser.map((value)=>{
                return(
                    <tr key={value.idusuario} >
                        <td style={{paddingTop:20,paddingBottom:20}}>{value.nombre}</td>
                        <td >{value.apellidos}</td>
                        <td>{value.roles === "ADMIN"?"Administrador":"Usuario"}</td>
                        <td>{value.email}</td>
                        <td>
                            {
                                (value.roles === "ADMIN" && currentUser.nombre !== value.nombre )?
                                null
                                :
                                <>
                                    <Link className="button-style" style={{backgroundColor:"green",textDecoration:"none"}} to={`/user/add/${value.idusuario}`}>Editar</Link>
                                    <Link className="button-style" style={{backgroundColor:"red",textDecoration:"none"}} onClick={()=>deleteUsersHandler(value.idusuario)}>
                                        Eliminar
                                    </Link>
                                </>
                            }
                            
                            
                        </td>
                    </tr>
                )
            }).slice(minPage,maxPage)
        )
    }
    return(
        <div className="containerUsers">
            <div className="userHeader">
                <div className="containerShearch">
                    <form onSubmit={sendShearchHandler} >
                        <div className="formShearch">
                            <input type="text" 
                                id="name"
                                className="inputShearch"
                                placeholder="nombre"
                                onChange={nameHandler}
                                value={shearch}
                                />
                            <button className="buttonShearch" type="submit">
                                <img src="./shearch.png" alt="" style={{height:15}}/>
                            </button>
                        </div>
                    </form>
                     
                </div>

                <Link className="userAddButton" to="/user/add">Agregar</Link>
            </div>
            {
                users.length === 0 ?(<div className="errorMessage">no se a encontrado resultados</div>)
                :
                (
                <table >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Rol</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderUsers()}
                    </tbody>
                </table>
                )
            }

            {
                loadUser.length&&
                <Pagination size={loadUser.length} renderNumPages={nRenderPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            }
            
        </div>
    )
}

export default ShowUsers