
import { Link } from "react-router-dom"

const Students = () =>{
    return(
        <div className="containerUsers">  
        
        <div className="studentOption">
            <Link className="studentButton" to ="/students/add">añadir alumno</Link>
            <Link className="studentButton" to="/students/import">Importar alumnos</Link>
        </div>
            
        </div>
    )
}

export default Students