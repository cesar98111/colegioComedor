import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Pagination from "../../pagination/pagination"
import * as studentService from "../../../services/student.services"
import io from "socket.io-client"
import key from "../../../services/keys.json"
import * as serviceDischarge from "../../../services/discharge.service"
import * as covertor from "../../../services/conversorDate"

const Asistances = () =>{
    const socket = io.connect("http://localhost:8000");
    const {course,etage} = useParams()
    const [loadStudent, setLoadStudent] = useState([])
    const [students, setStudents] = useState([])
    const [token, setToken] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [shearch, setShearch] = useState("")
    const recordsPerPage = 5;
    const lastPage = currentPage * recordsPerPage;
    const firstPage = lastPage - recordsPerPage;
    
    useEffect(()=>{
        const getStudents = async () =>{
            const data =await studentService.getStudentsByCourse(etage,course)
            setStudents(data)
            setLoadStudent(data)
            setToken(window.localStorage.getItem(key.KEYTOKEN))
        }

        getStudents()
        
    },[])
    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            console.log("datos del socket")
            console.log(data)
            setStudents(data)
            setLoadStudent(data)
        })
    },[socket])

    
    const handleDay = (e) =>{
        let days
        
        if(loadStudent[e.target.id].dias !== null && loadStudent[e.target.id].dias !== ""){
            
            days ={
                L:loadStudent[e.target.id].dias.indexOf("L") === -1 ? false : true,
                M:loadStudent[e.target.id].dias.indexOf("M") === -1 ? false : true,
                X:loadStudent[e.target.id].dias.indexOf("X") === -1 ? false : true,
                J:loadStudent[e.target.id].dias.indexOf("J") === -1 ? false : true,
                V:loadStudent[e.target.id].dias.indexOf("V") === -1 ? false : true
            }
            
        }else{

            days ={
                L:false,
                M:false,
                X:false,
                J:false,
                V:false
            }

        }

            let string =""
                days ={
                    ...days,
                    [e.target.value]: !days[e.target.value]  
                  }
                 
                  
            for(let key in days){
                if(days[key] === true){
                    string = string + "," + key
                } 
            }
            string = string.slice(1,string.length)
            console.log(string)

            const alta = covertor.DateConvert(loadStudent[e.target.id].fecha_alta)
            const baja = covertor.DateConvert(loadStudent[e.target.id].fecha_baja)
            let config ={
                
                id:loadStudent[e.target.id].idAlumno,
                days:string,
                comedor:loadStudent[e.target.id].comedor,
                alergias:loadStudent[e.target.id].alergias,
                alta:alta,
                baja:baja

            }
        
        socket.emit("send_message",{student:config, etage:etage, course:course}) 
    }
    const handleDinig = (e) =>{
        

        const alta = covertor.DateConvert(loadStudent[e.target.id].fecha_alta)
        const baja = covertor.DateConvert(loadStudent[e.target.id].fecha_baja)
        
        let config ={
                
            id:loadStudent[e.target.id].idAlumno,
            days:e.target.checked ? loadStudent[e.target.id].dias: "" ,
            comedor:e.target.checked ? 1: 0,
            alergias:loadStudent[e.target.id].alergias,
            alta:alta,
            baja:baja
        }
        console.log(config)
        socket.emit("send_message",{student:config, etage:etage, course:course}) 
    }
    const hanldeDischarge = async (e) =>{
        const date = new Date()
        const dateFormat = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        console.log(dateFormat)
        if(e.target.checked){
            let config ={
                id:loadStudent[e.target.id].idAlumno,
                days:loadStudent[e.target.id].dias,
                comedor:loadStudent[e.target.id].comedor,
                alergias:loadStudent[e.target.id].alergias,
                alta:dateFormat,
                baja:null
                
            }
            socket.emit("send_message",{student:config, etage:etage, course:course}) 
        }else{
            const alta = new Date(students[e.target.id].fecha_alta)
            const altaFormat = alta.getFullYear()+"-"+(alta.getMonth()+1)+"-"+alta.getDate()
            console.log(altaFormat)
            // refactorizar
            
            let config ={
                id:loadStudent[e.target.id].idAlumno,
                days:loadStudent[e.target.id].dias,
                comedor:loadStudent[e.target.id].comedor,
                alergias:loadStudent[e.target.id].alergias,
                alta:altaFormat,
                baja:dateFormat
            }
            socket.emit("send_message",{student:config, etage:etage, course:course}) 
            await serviceDischarge.dischargeInsert(students[e.target.id].idAlumno,altaFormat,dateFormat,token)
           
        }
    }
    
    const handleAllergies = (e) =>{
        const alta = covertor.DateConvert(loadStudent[e.target.id].fecha_alta)
        const baja = covertor.DateConvert(loadStudent[e.target.id].fecha_baja)
        
        let config ={
                
            id:loadStudent[e.target.id].idAlumno,
            days:loadStudent[e.target.id].dias,
            comedor:loadStudent[e.target.id].comedor,
            alergias:e.target.checked ? 1 : 0,
            alta:alta,
            baja:baja
        }
        socket.emit("send_message",{student:config, etage:etage, course:course}) 
        
    }
    const checked = (id,day) =>{
        if(loadStudent[id].dias !== null){
            
            if(loadStudent[id].dias.indexOf(day) !== -1){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
            
        
    }
    const renderStudents = () =>{
    
        return(
            
        loadStudent&&
            loadStudent.map((value,index)=>{
                return(
                    <tr key={value.idAlumno}>
                        <td>{value.nombre}</td>
                        <td>
                            <input id={index} type="checkbox" checked={value.comedor===1} onChange={handleDinig} />
                        </td>
                        <td>
                            <input id={index} type="checkbox" checked={value.fecha_baja === null} onChange={hanldeDischarge} />
                        </td>
                        <td>

                            <input id={index} disabled={value.comedor===0} name="days" value="L" onChange={handleDay} checked={checked(index,"L")} type="checkbox" />
                            <input id={index} disabled={value.comedor===0} name="days" value="M" onChange={handleDay} checked={checked(index,"M")} type="checkbox" />
                            <input id={index} disabled={value.comedor===0} name="days" value="X" onChange={handleDay} checked={checked(index,"X")} type="checkbox" />
                            <input id={index} disabled={value.comedor===0} name="days" value="J" onChange={handleDay} checked={checked(index,"J")} type="checkbox" />
                            <input id={index} disabled={value.comedor===0} name="days" value="V" onChange={handleDay} checked={checked(index,"V")} type="checkbox" />
                        
                        </td>
                        <td>
                            <input id={index} onChange={handleAllergies} checked={value.alergias === 1} type="checkbox" />
                        </td>
                        <td style={{textAlign:"center"}}>
                            <Link className="viewButton" to={`/highs/${value.nombre}`}>
                                <img src="/ojo.png" alt="" style={{height:20,width:20}} />
                            </Link>
                        </td>
                        <td >
                            <Link className="viewButton" to={`/Days/${value.nombre}`} >
                                <img src="/ojo.png" alt="" style={{height:"100%",width:20}} />
                            </Link>
                        </td>
                    </tr>
                )
            }).slice(firstPage,lastPage)
            
            
        )
        
    }
    const nameHandler = async(e) =>{
        const name = e.target.value
        setShearch(e.target.value)
        
        setLoadStudent(students.filter((value)=>{return value.nombre.startsWith(name)}))
        
    }

    const sendShearchHandler = async (e) =>{
        e.preventDefault()
        if(shearch !== ""){
            setLoadStudent(await studentService.getStudentByName(shearch,course,etage))
        }else{
            setLoadStudent(await studentService.getStudentsByCourse(etage,course))
        }
        
        

    }
    return(

        <div className="containerUsers">
            <div className="studentHeader">
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
                            <button className="buttonShearch" style={{height:40}} type="submit">
                                <img src="/shearch.png" alt="" style={{height:"90%"}}/>
                            </button>
                        </div>
                    </form>
                   
                </div>
                <h1 className="courseTitle" style={{padding:5}}>{course} de {etage}</h1>
            </div>
            
            {
                students.length ===  0? (<div className="errorMessage"> no se a encontrado usuarios</div>):
                (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Comedor</th>
                                <th>Alta</th>
                                <th>L   M   X   J   V</th>
                                <th>Alergias</th>
                                <th>info Alta</th>
                                <th>Asistencias</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderStudents()}
                        </tbody>
                    </table>
                )
            }
            
            {
               
                loadStudent.length !== undefined && loadStudent.length !== 0 ?
                <Pagination size={loadStudent.length} renderNumPages={recordsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                :null
            }
        </div>

        
    )
}

export default Asistances