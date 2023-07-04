 import jwt from "jsonwebtoken"
import httpCodes from "../error/httpCodes.mjs"
 import keys from "../security/keys.mjs"
 import {getUserById, getUser} from "../services/userService.mjs"


 
export const  verifyToken = async(req,res, next)=>{
   console.log("hola")
   try{
      const foundUsers = await getUser()
      if(foundUsers.length !== 0){
         const token = req.headers["x-access-token"]
         
         if(!token){
            
            res.status(httpCodes.FORBIDEN)
            res.send({
               statusCode: httpCodes.FORBIDEN,
               statusMessage: "forbiden",
               message: "no token provied"
            })
            return
         }
         
         const decoded  =jwt.verify(token, keys.KEYTOKEN)
        
         req.idUser =decoded.id
         const userFound = await getUserById(decoded.id)
         
        
         if (!userFound){
            
            res.staus(httpCodes.NOT_FOUND)
            res.send(
               {
                  statusCode: httpCodes.NOT_FOUND,
                  statusMessage:"not found",
                  message:"user not found"
               }
            )
            return
         }

         
      }
      
      next()
   }catch(err){
      res.status(httpCodes.FORBIDEN)
      res.send({
         statusCode: httpCodes.FORBIDEN,
         statusMessage:"forbiden",
         message: "unatorized",
         
      })
      return
   }
    


}

export const isAdmin = async (req, res, next) =>{
   
   try{
      const foundUsers = await getUser()
      
      if(foundUsers.length !== 0){
         
         const userData = await getUserById(req.idUser)
         
         if(userData.roles !== "ADMIN"){
            
            res.status(httpCodes.FORBIDEN)
            res.send({
               statusCode: httpCodes.FORBIDEN,
               statusMessage: "forbiden",
               message: "unaothorized"
            })
            return
         }
         
         
      }
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