
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as serviceDay from "../../../services/days.service"
import key from "../../../services/keys.json"
import {DateConvert} from "../../../services/conversorDate"
import Calendar from "../../Calendar/Calendar"
import Pagination from "../../pagination/pagination"

const Days = () =>{
    const {name} = useParams()
    const [days, setDays] = useState([])
    const [modify, setModify] = useState(false)
    const [asistanceNum, setAsistanceNum] = useState()
    const [token, setToken] = useState(window.localStorage.getItem(key.KEYTOKEN))
    const [lastDate, setlastDate] = useState(new Date())
    const [initDate, setInitDate] = useState(new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate()-7))
    const [modifyInitDate, setModifyInitDate] = useState(false)
    const [modifyLastDate, setModifyLastDate] =useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5

    const lastPage = recordsPerPage * currentPage
    const firstPage = lastPage - recordsPerPage
    useEffect(()=>{
        
        const getDay = async () =>{
            setDays(await serviceDay.getDayByname(name, token) )
        } 
        getDay()
    },[])
    useEffect(()=>{
        let count = 0
        if(days.length !== 0){
            days.forEach((value)=>{
                if(value.asistencia === 1){
                    count ++
                }
            })

            setAsistanceNum(count)
        }
        
    },[days])
    const handlerAsist = async(e) =>{
        const index = e.target.value
        const date = DateConvert(days[index].fecha)
        await serviceDay.updateAsistanceDayName(e.target.checked === true ? 1 : 0 ,name,date,token)
        setDays(await serviceDay.getDayByname(name, token) )

    }
    const renderDays = () =>{
        return(
            days&&
            days.map((value, index)=>{
                return(
                    <tr>
                        <td>{DateConvert(value.fecha)}</td>
                        <td>{value.asistencia === 1 ? "si" :"no"}</td>
                    </tr>
                )
            }).slice(firstPage, lastPage)
        )
    }
    useEffect(()=>{
        console.log(firstPage, lastPage)
    })
    const renderModifyMode = () =>{
        
        return(
            days&&
            days.map((value, index)=>{
                return(
                    <tr>
                        <td>{DateConvert(value.fecha)}</td>
                        <td>
                            <input type="checkBox" value={index} onChange={handlerAsist} checked={value.asistencia === 1} />
                        </td>
                    </tr>
                )
            }).slice(firstPage,lastPage)
        )
    }
    useEffect(()=>{
        

        const getDate = async () =>{
            const firstDay = DateConvert(initDate)
            const lastDay = DateConvert(lastDate)
            setDays(await serviceDay.getBetewnDate(firstDay,lastDay,name,token))
        }
        if(days.length !==0){
            getDate()
        }
        setModifyInitDate(false)
        setModifyLastDate(false)
    },[lastDate,initDate])

    return(
        <div className="containerUsers">
            <div className="headerDay">
                <h2>Alumno: <span style={{color:"white"}}>{name}</span></h2>
                <h2>Número de asistencias: {asistanceNum}</h2>
            </div>
            <div className="filterDayContainer">
                <h4>Del dia</h4> 
                {modifyInitDate === true ? <Calendar setDate={setInitDate}/>: <h4 className="date" onClick={()=>setModifyInitDate(!modifyInitDate)}>{DateConvert(initDate)}</h4> } 
                <h4>hasta</h4>
                {modifyLastDate === true ? <Calendar setDate={setlastDate}/>: <h4 className="date" onClick={()=>setModifyLastDate(!modifyLastDate)}>{DateConvert(lastDate)}</h4>}
            </div>
            {
                days.length === 0? (<p>no se ha encontrado resultados</p>)
                :
                (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                modify === true ?
                                renderModifyMode()
                                :
                                renderDays()
                            }
                            
                        </tbody>
                    
                    </table>
                )
            }
            
           
            {
                days.length !== 0?
                <Pagination size={days.length} renderNumPages={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                :null
            }
            {
                days.length !== 0?
                <button className="modifyDayButton" onClick={()=>setModify(!modify)}>
                    Modificar
                </button>
                :null
            }
            
            
            
        </div>
    )
}

export default Days