import { useState, useEffect } from "react"
import * as serviceCourse from "../../../services/course.service"
import { insertStudent } from "../../../services/student.services"
import key from "../../../services/keys.json"
import { useNavigate } from "react-router-dom"

const AddStudents = () =>{
    const navigate = useNavigate()
    const[course, setCourse] = useState([])
    const [student, setStudent] = useState({
        name:"",
        lastName:"",
        etage:"",
        course:""
    })
    const[etage, setEtagte] = useState("")
    const token = window.localStorage.getItem(key.KEYTOKEN)
    useEffect(()=>{
        const getCourse = async () =>{
            setCourse(await serviceCourse.getCourseByEtage(student.etage))
            console.log(course)
        }

        if(student.etage !== ""){
            getCourse()
            
        }

    },[student.etage])

    const handlerStudent = (e) =>{
        setStudent({
            ...student,
            [e.target.name]:e.target.value  
        })
    }
    const renderCoursesOptions = () =>{
        return (
            course.map((value) =>{
                return(
                    <option value={value.curso}>{value.curso}</option>
                )
            })
        )
    }

    const handlerSubmitStudent = async (e) =>{
        e.preventDefault()
        console.log(student)
        if(student.course !== "" && student.etage !== "" && student.name !== "" && student.lastName !== ""){
            const fullName = student.name+", "+student.lastName
            const stundentSend = {
                nombre:fullName,
                etapa:student.etage,
                curso:student.course
            }
            await insertStudent(stundentSend, token)
            window.alert("estudiante introducido con exito")
            navigate("/students")
        }else{
            window.alert("faltan parametros")
        }
    }

    return(
        <div className="containerUsers">
            <h2 className="studentAddTitle">Formulario nuevo alumnado</h2>
            <div className="containerAddStudents">
                <form className="formStudents" onSubmit={handlerSubmitStudent}>
                    <div className="inputsStudents">
                        <div className="columnName">
                            <label htmlFor="name"style={{marginTop:10,marginBottom:2,textAlign:"center"}}>Nombre</label>
                            <input type="text"
                                id="name"
                                name="name"
                                className="inputStudent"
                                placeholder="Nombre"
                                value={student.name}
                                onChange={handlerStudent}/>
                            <label htmlFor="lastName" style={{marginTop:10,marginBottom:2, textAlign:"center"}}> Apellidos</label>
                            <input type="text"
                                id="lastName"
                                name="lastName"
                                className="inputStudent"
                                placeholder="Apellidos"
                                value={student.lastName}
                                onChange={handlerStudent}>
                            </input>
                        </div>
                        <div className="columnCourse">
                            <select name="etage" id="etapa" value={student.etage} onChange={handlerStudent} className="etageSelect" >
                                <option value="" disabled style={{display:"none"}}>Etapa</option>
                                <option value="INFANTIL">Infantil</option>
                                <option value="PRIMARIA">Primaria</option>
                                <option value="SECUNDARIA">Secundaria</option>
                            </select>

                            <select name="course" id="curso" value={student.course} onChange={handlerStudent} className="etageSelect">
                                {
                                    student.etage === "" ? <option value="" disabled >cursos</option>
                                    :
                                    <>
                                        <option value="" disabled style={{display:"none"}}>cursos</option>
                                        {renderCoursesOptions()}
                                    </>
                                    
                                }
                            </select>
                        </div>
                    </div>
                    <button className="buttonAddStudent" type="submit">
                        Añadir
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddStudents