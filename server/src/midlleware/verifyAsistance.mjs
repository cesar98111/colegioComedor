import httpCodes from "../error/httpCodes.mjs"
import * as serviceDay from "../services/daysServices.mjs"

export const existDay = async (req, res, next) =>{
    
    try{
        const data = await serviceDay.getTodayAsistance()
        
        if(data.length === 0)  return next() 
        
        res.send({message:"date alredy exist"})
        return
    }catch(err){
        
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({
            statusCode:httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage:"interna server error",
            message:"server has fallen"
        })
    }
}