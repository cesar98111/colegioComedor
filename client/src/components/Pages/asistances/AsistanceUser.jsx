import { useEffect, useState } from "react"
import * as serviceStudent from "../../../services/student.services"
import { useParams } from "react-router-dom"
import * as serviceDay from "../../../services/days.service"
import Pagination from "../../pagination/pagination"

const AsistanceUser = () =>{
    const {etage, course} = useParams()
    const [student, setStudent] = useState([])
    const [asistances, setAsistances] = useState([])
    const [currentPages, setCurrentPages] = useState(1)
    const recorPerPages = 5

    const lastPage = currentPages * recorPerPages;
    const firstPage = lastPage - recorPerPages; 
    useEffect(()=>{
        const getStudent = async ()=>{
            const data = await serviceStudent.getAluByToDay(course,etage)

            let asistanceAux = []
            for(let i = 0; i<data.length;i++){
                const result = await serviceDay.getAsistanceToDay(data[i].nombre)
                if(result !== undefined){
                    asistanceAux.push(result)
                }else{
                    await serviceDay.insertSpcificDay(data[i].idAlumno)
                    asistanceAux.push({nombre:data[i].nombre, asistencia:0})
                }
                
            }
            console.log(asistanceAux[1].asistencia)
            setAsistances(asistanceAux)
            setStudent(data)
        }

        getStudent()

    },[])
    
    
    const asistanceHandler = async(e) =>{
        await serviceDay.updateAsistance(e.target.value,e.target.checked === true ? 1: 0)
        setStudent(await serviceStudent.getAluByToDay(course,etage))
        
    }
    

    
    
    const renderStudents = () =>{
        const hola=[{nombre:"pepe",apellido:"gustabo"},{nombre:"cesar",apellido:"leon"}]
        console.log(asistances)
        return(
            (asistances.length!==0)?
            student.map((value, index) =>{
                return(
                    <tr key={value.idAlumno}>
                        <td>{value.nombre}</td>
                        <td>{value.comedor === 1 ? "si":"no"}</td>
                        <td>{value.fecha_baja === null  ? "si":"no"}</td>
                        <td>{value.dias}</td>
                        <td>
                            <input value={value.nombre} onChange={asistanceHandler} defaultChecked={asistances[index].asistencia=== 1} type="checkbox" />
                        </td>
                        <td>{value.alergias === 1 ? "si":"no"}</td>
                    </tr>
                )
            }).slice(firstPage,lastPage):null
            
        )
    }

    return(
        <div className="containerUsers">
            <h1 className="courseTitle" style={{padding:5}}>{course} de {etage}</h1>
            {
                (student.length === 0 || asistances.length === 0)
                ? 
                <div className="errorMessage">
                    estudiantes no encontrados
                </div>
                :
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Comedor</th>
                            <th>Alta</th>
                            <th>dias</th>
                            <th>asistencia</th>
                            <th>Alergias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderStudents()}
                    </tbody>
                </table>
            }
            {
                (student.length === 0 || asistances.length === 0)?
                null  
                :<Pagination size={student.length} renderNumPages={recorPerPages} setCurrentPage={setCurrentPages} currentPage={currentPages}/>
            }
        </div>
    )
}

export default AsistanceUser