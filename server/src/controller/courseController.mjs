import httpCodes from "../error/httpCodes.mjs"
import * as courseService from "../services/courseService.mjs"


export const getCourseByEtageController = async (req, res) =>{
    const {etage} = req.params

    if(etage){
        try{
            const data = await courseService.getCourseByEtage(etage)
            res.status(etage ? httpCodes.OK : httpCodes.NOT_FOUND)
            res.send({
                statusCode: etage ? httpCodes.OK : httpCodes.NOT_FOUND,
                statusMessage: etage ? "ok": "not found",
                message: etage ? "cours found susesfully":"cours not found",
                data
            })
        }catch(err){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            res.send({
                statusCode:httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage:"internal server error",
                message:"server has fallen"
            })
        }
    }else{
        res.status(httpCodes.BAD_REQUEST)
        res.send({
            statusCode:httpCodes.BAD_REQUEST,
            statusMessage:"bad request",
            message:"require params"
        })
    }
}