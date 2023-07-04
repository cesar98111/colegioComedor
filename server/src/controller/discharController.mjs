import * as serviceDischarge from "../services/dischargeService.mjs"
import * as serviceAlu from "../services/aluService.mjs"
import httpCodes from "../error/httpCodes.mjs"

export const insertDischarge = async (req,res) =>{
    const {alta, baja} = req.body
    const {id} = req.params
    
    if(id,alta,baja){
        try{
            const data = await serviceDischarge.DischarRecordInsert(id,alta,baja)
            
            res.status(httpCodes.OK)
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: "ok",
                message: "discharge insert sucesfully"
            })
        }catch(err){
            console.log("s")
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            res.send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "internal server error",
                message: "server has fallen"
            })
        }
    }else{
        res.status(httpCodes.BAD_REQUEST)
        res.send({
            statusCode:httpCodes.BAD_REQUEST,
            statusMessage:"bad Request",
            message: "params required"
        })
    }
}