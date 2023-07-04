
import { useEffect, useState} from "react"
import {Routes,Route, useNavigate} from "react-router-dom"
import SigIn from "../Pages/logins/SigIn"
import Home from "../Pages/Home"
import ShowUsers from "../Pages/users/ShowUsers"
import AddUsers from "../Pages/users/AddUsers"
import Students from "../Pages/studentes/students"
import ImportStudents from "../Pages/studentes/ImportStudents"
import Asistances from "../Pages/asistances/Asistances"
import Cours from "../Pages/Cours/Cours"
import Days from "../Pages/asistances/Days"
import AsistanceUser from "../Pages/asistances/AsistanceUser"
import PasswordUpdate from "../Pages/users/PasswordUpdate"
import AddStudents from "../Pages/studentes/AddStudents"
import Highs from "../Pages/asistances/Highs"
import * as services from "../../services/user.services"
import key from "../../services/keys.json"
import Navbar from "../navbar/Navbar"
import Error from "../error/Error"



const ComedorApp = ()=>{
    
    const navigate = useNavigate()
    const [token, setToken] = useState()
    useEffect(()=>{
        
        const getUser = async() =>{
            
            const data = await services.getUser(window.localStorage.getItem(key.KEYTOKEN))
            console.log(data)
            if(data === undefined){
                window.localStorage.clear()
                setToken(undefined)
                navigate("/")
            }else{
                setToken(data)
            }
            
            
            
        }

        getUser()
        
    },[])
    
    return(
        <div className="container" >

                {
                    token === undefined?
                    (
                    <Routes>
                        <Route path="/" element={<SigIn/>}></Route>
                    </Routes>
                    
                    )
                    :
                    (
                        <>  
                            <Navbar token={token}/>
                            <Routes>
                                <Route path="/" element={<Home/>}></Route>
                                <Route path="/user" element={<ShowUsers/>} ></Route>
                                <Route path="/user/add" element={<AddUsers/>}></Route>
                                <Route path="/user/add/:id" element={<AddUsers/>}></Route>
                                <Route path="/students" element={<Students/>}></Route>
                                <Route path="/students/import" element={<ImportStudents/>}></Route>
                                <Route path="/course/:etage" element={<Cours/>}></Route>
                                <Route path="/asistance/:course/:etage" element={<Asistances/>}></Route>
                                <Route path="/asistanceUser/:course/:etage" element={<AsistanceUser/>}></Route>
                                <Route path="/Days/:name" element={<Days/>}></Route>
                                <Route path="/user/password/:id" element={<PasswordUpdate/>}></Route>
                                <Route path="/students/add" element={<AddStudents/>}></Route>
                                <Route path="/highs/:name" element={<Highs/>}></Route>
                                <Route path="*" element={<Error/>}></Route>
                            </Routes>
                        </> 
                    )
                }         
                    
        </div>
    )
}

export default ComedorApp