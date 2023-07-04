import "./styles.css"
import { useEffect, useState } from "react"

const Calendar = ({date,setDate}) =>{

    const [years, setYears] = useState([])
    const [currentYear, setCurrentYears] = useState()
    const [pageCurrentYear, setPageCurrentYear] = useState(26)
    const [pageCurrentMonth, setPageCurrentMonth] = useState(1)
    const [month, setmonth] = useState(["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Nobiembre","Diciembre"])
    const [days, setDays] = useState([])
    const [currentDay, setCurrentDay] = useState()
    const [render,setRender] = useState(true)
    useEffect(()=>{
        const date = new Date(2022,12,0)
       
        const numYear = (date.getFullYear()+1)-1998
        setCurrentYears(date.getFullYear()+1)
        let day = []
        for(let i = 1; i<=parseInt(date.getDate()); i++){
            day.push(i)
        }
       
        setDays(day)

        let year = []
        for (let i = 0; i<=numYear ; i++){
            year.push(1998+i)
        }
        
        setYears(year)
        
    },[])

    const lastYear =() =>{
        setCurrentYears(years[pageCurrentYear-2])
        setPageCurrentYear(pageCurrentYear -1)
    }
    const nextYear = () =>{
        setCurrentYears(years[pageCurrentYear])
        setPageCurrentYear(pageCurrentYear +1)
    }
    useEffect(()=>{
        if(render === false){
            
            if(pageCurrentMonth === 12){
                const newDate = new Date(currentYear+1,1,0)
                let day =[]
                for(let i=1; i<=newDate.getDate(); i++){
                     day.push(i)
                }
                
                setDays(day)
                
             }else{
                
                 const newDate = new Date(currentYear,pageCurrentMonth,0)
                 let day =[]
                 for(let i=1; i<=newDate.getDate(); i++){
                     day.push(i)
                 }
                 
                 setDays(day)
             }
        }
        setRender(false)
    },[currentYear,pageCurrentMonth])
    const dateBuild = (day) =>{
        const newDate = new Date(currentYear,pageCurrentMonth-1,day)

        setDate(newDate)
    }
    const renderYear = () =>{
        return(
            years.map((value)=>{
                return(
                    <div className="yearContainer">
                        <button className="buttonNext" disabled={pageCurrentYear <= 1} onClick={()=>lastYear()}>
                            <img src="/back.png" alt="" style={{height:10}} />
                        </button>
                        <span>{value}</span>
                        <button className="buttonNext" disabled={pageCurrentYear >= years.length} onClick={()=>nextYear()}>
                            <img src="/next.png" alt="" style={{height:10}} />
                        </button>
                    </div>
                )
            }).slice(pageCurrentYear-1,pageCurrentYear)
        )
    }

    const renderMonth = () =>{
        return(
            month.map((value)=>{
                return(
                    
                    <div className="yearContainer">
                        <button className="buttonNext" disabled={pageCurrentMonth <= 1} onClick={()=>setPageCurrentMonth(pageCurrentMonth-1)}>
                            <img src="/back.png" alt="" style={{height:10}} />
                        </button>
                        <span>{value}</span>
                        <button className="buttonNext" disabled={pageCurrentMonth >= month.length} onClick={()=>setPageCurrentMonth(pageCurrentMonth+1)}>
                            <img src="/next.png" alt="" style={{height:10}} />
                        </button>
                    </div>
                )
            }).slice(pageCurrentMonth-1, pageCurrentMonth)
        )
    }
    const renderColumnDay = () =>{
        const maxDay = parseInt((days.length/5).toFixed())+1
        
        
        const num =[1,2,3,4,5]
        return(
            num.map( (value,index) =>{
                const max = (index+1)*maxDay 
                const min = max-maxDay
                
                return(
                    <div className="rowDay" style={index === 4 ? {justifyContent:"flex-start"}:null}>
                        {renderDay(min,max)}
                    </div>
                )
            })
        )
        
        
    }
    const renderDay = (min,max) =>{
        
        const day =days.filter((value, index)=>{
            if(index >= min && index <max){
                return value
            }
        })
        
        return(
            day.map((value)=>{
                return(
                    <div className="day" onClick={()=> dateBuild(value)}>
                        {value}
                    </div>
                )
            })
        )
    }
    return(
        <div className="calendarContainer">
            
            {renderYear()}
            {renderMonth()}
            <div className="dayContainer">
                {renderColumnDay()}
            </div>
            
        </div>
    )
}

export default Calendar