import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as serviceCourse from "../../../services/course.service"
import * as serviceUser from "../../../services/user.services"
import key from "../../../services/keys.json"
import { Link } from "react-router-dom"
const Cours = () =>{
    const {etage} = useParams()
    const [course, setCourse] = useState([])
    const [user, setUser] = useState()
    useEffect(()=>{
        const getCourse = async() =>{
            setCourse(await serviceCourse.getCourseByEtage(etage))
        }
        const getUserData = async() =>{
            const data = await serviceUser.getUser(window.localStorage.getItem(key.KEYTOKEN))
            
            setUser(data)
        }
        getUserData()
        getCourse()
    },[])

    const numRow = Math.ceil(course.length / 3)

    const renderCours = (value) =>{
        const lastRecord =value * numRow;
        const firstRecord =  lastRecord-numRow;
        console.log("primi"+numRow)
        const newCourse = course.filter((value,index)=>{
            
            if( firstRecord <= index && lastRecord > index){
                
                return value
            }
        })
        
        return(
            course&&user&&
            newCourse.map((value,index)=>{
                return(
                    <Link className="courseItems" to={user.roles === "ADMIN" ?`/asistance/${value.curso}/${value.etapa}`:`/asistanceUser/${value.curso}/${value.etapa}`}>
                        {value.curso}
                    </Link>
                )
                
                
            })
            
        )
    }

    const renderColumn = () =>{
        let numArrayRow = []
        
        for(let i=1; i<=numRow; i++){
            numArrayRow.push(i)
            
        } 
        return(
            numArrayRow.map((value)=>{
                return(
                    <div className="rowCourse">
                        {renderCours(value)}
                    </div> 
                    ) 
            })
        )
        
            
    }

    return(
        <div className="containerUsers">
            <h2 className="courseTitle" >{etage}</h2>
            {
                course&&user&&
                renderColumn()
                
            }
        </div>
    )
}

export default Cours