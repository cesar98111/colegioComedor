
export const DateConvert = (date)=>{
    
    if(date !== null){
        const newDate = new Date(date)
        const dateFormat = newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()

        return dateFormat
    }

    return null
    
}