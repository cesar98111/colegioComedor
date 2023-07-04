import { useParams } from "react-router-dom"
import Pagination from "../../pagination/pagination"
import { useState , useEffect } from "react"
import { getHighsByName } from "../../../services/student.services"
import keys from "../../../services/keys.json"
import { DateConvert } from "../../../services/conversorDate"
const Highs = () =>{
    
    const {name} = useParams()
    const token = window.localStorage.getItem(keys.KEYTOKEN)
    const [highs , setHighs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage= 5;
    const lastPage = currentPage * recordsPerPage
    const firstPage = lastPage - recordsPerPage
    useEffect(()=>{
        const getHighs = async()=>{
            setHighs(await getHighsByName(name, token) )
        }

        getHighs()
    },[])


    const renderHighs = () =>{
        return(
            highs.map((value)=>{
                return(
                    <tr key={value.alta}>
                        <td>{DateConvert(value.alta)}</td>
                        <td>{DateConvert(value.baja)}</td>
                    </tr>
                )
            }).slice(firstPage, lastPage)
        )
    }
    return(
        <div className="containerUsers">
            <h2 className="TitleHighs">Listado de altas de: <span style={{color:"black"}}>{name}</span> </h2>
            {
                highs.length === 0 ?
                <p className="errorMessage">no se han encontrado resultados</p>
                :
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha de Altas</th>
                                <th>Fechas de bajas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderHighs()}
                        </tbody>
                    </table>
                    <Pagination size={highs.length} renderNumPages={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </>
                
            }
            
        </div>
    )

}

export default Highs