import { useEffect, useState } from "react"



const Pagination = ({size,renderNumPages, currentPage, setCurrentPage}) =>{
    const [Pages, setPages] = useState([])
    useEffect (()=>{
        console.log("tamaño"+size)
        let array = []
        const numOfPages = Math.ceil(size/renderNumPages)
        for(let i = 1; i<=numOfPages ; i++){
            array.push(i)
        }
        console.log(size)
        setPages(array)
        
    },[size])

    const lastPage =() =>{
        console.log(currentPage)
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
        
    }
    const nextPage = () =>{
        console.log(Pages.length)
        if(currentPage < Pages.length){
            setCurrentPage(currentPage+1)
        }
    }
    return(
        <div className="paginationContainer">
            <ul className="paginationButton"  onClick={()=> lastPage()}>Atrás</ul>
            {
                Pages.map((value)=>{
                    return(
                        <span key={value} onClick={()=>setCurrentPage(value)} style={currentPage === value ? {backgroundColor:"#524BEB"}:null} className="pageNum">
                            {value}
                        </span>
                    )
                })
            }
            <ul className="paginationButton" onClick={() => nextPage()}>Siguiente</ul>
        </div>
    )
}

export default Pagination