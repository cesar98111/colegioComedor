import httpCodes from "../error/httpCodes.mjs"
import * as services from "../services/userService.mjs"
import * as Security from "../security/password.mjs"

export const verifyUser = async(req, res, next ) =>{
    try{
        
        const userFound = await services.getUserByName(req.body.nombre)
        if(userFound) return res.status(httpCodes.CONFLICT).send({message: "existing user"})
        

        const userFoundEmail = await services.getUserByEmail(req.body.email)
        if(userFoundEmail) return res.status(httpCodes.CONFLICT).send({message:"existing user"})
        next()
        
    }catch(err){
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({
           statusCode:httpCodes.INTERNAL_SERVER_ERROR,
           statusMessage: "internal server error",
           message:"server has fallen"
        })
        return
    }
}



