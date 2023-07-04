import * as userService from "../services/userService.mjs"
import httpCodes from "../error/httpCodes.mjs"
import * as Security from "../security/password.mjs"
import jwt from "jsonwebtoken"
import keys from "../security/keys.mjs"


/*aqui estan los controladores que se encargaran de controlar
* y manejar las peticiones a la atabla usuario
*/


/* 
    controlador que devuelve el numero de usuarios que hay en la base de datos
*/
export const getUserCount = async (req, res) =>{
    
    try{
        const NUsers = await userService.getUserCount()
        res.status(NUsers !== 0 ? httpCodes.OK :  httpCodes.NOT_FOUND )
        res.send({
            httpCodes:NUsers !== 0 ? httpCodes.OK :  httpCodes.NOT_FOUND,
            messageCode:NUsers !== 0 ? "OK":"Not Found",
            message:NUsers !== 0 ? "users counts sucesfully":"empty",
            NUsers
            
        })
    }catch(err){
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({
            httpCode: httpCodes.INTERNAL_SERVER_ERROR,
            codeMessage: "Internal server error",
            message:"fallo de la conexion con el servidor"
        })
    }
    
}


/**
 * controlador que maneja las peticiones para buscar los usuarios
 */
export const getAllUserController = async (req, res)=>{
    try{
        const data = await userService.getUser()
        res.status(data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK)
        res.send({
            httpCode: data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
            codeMessage: data.length === 0 ? "Not Found": "OK",
            message: data.length === 0 ? "users not found" :"user found sucesfully",
            data
        }
            
        )
    }catch(err){
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({
            httpCode: httpCodes.INTERNAL_SERVER_ERROR,
            codeMessage: "Internal server error",
            message:"fallo de la conexion con el servidor"
        })
    }
}

export const getUserByToken = async (req, res) =>{
    
    const {token} = req.params
    console.log(token)
    if(token){
        
        try{
            const data = await userService.getUserById(jwt.verify(token,keys.KEYTOKEN).id)
            
            res.status(!data ? httpCodes.NOT_FOUND :httpCodes.OK)
            res.send({
                httpCodes: !data ? httpCodes.NOT_FOUND :httpCodes.OK,
                codeMessage:!data ? "not found ": "ok",
                message: !data ?"user not exist":"user found sucesfully",
                data
            })
        }catch(err){
            
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            res.send({
                httpCode: httpCodes.INTERNAL_SERVER_ERROR,
                codeMessage: "Internal server error",
                message:"fallo de la conexion con el servidor"
            }) 
            
        }
    }else{
        
        res.status(httpCodes.BAD_REQUEST)
        res.send({
            statusCode: httpCodes.BAD_REQUEST,
            messageCode:"bad Request",
            message:"params required"
        })
        
       
    }
   
}
export const getUserByNameController = async (req, res) =>{
    const {name} = req.params

    if(name){
        try{

            const data = await userService.getUserByName(name)
            
            
            res.status(!data ? httpCodes.NOT_FOUND: httpCodes.OK)
            res.send({
                statusCode:!data? httpCodes.NOT_FOUND: httpCodes.OK,
                statusMessage: !data ? "not found" : "OK",
                message: !data ? "data not found" : "data found sucesfully",
                data: !data ? null : data
            })
        }catch(err){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            res.send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "internal server error",
                message:"server has fallen"
            })
        }
    }else{
        res.status(httpCodes.BAD_REQUEST)
        res.send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "bad request",
            message:"require params" 
        })
    }
}
/** 
 * controlador que maneja las peticiones para insertar un usuario
*/
export const sigUp = async (req,res)=>{
    
    //desgloza el objeto devuelto por el body en diferentes variables para recojer las que interezan
    const {nombre,apellidos,email,password,roles} = req.body
    
    //comprobamos que no falta ninguna variable
    if((nombre&&apellidos&&email&&password)){
        // comprobamos que no alla recibido un rol desconocido
        if(roles === "ADMIN"||roles === "USER"||!roles){
            try{
                /**
                 *  insertamos los datos del usuario nuevo a la base de datos y recojemos el objeto con 
                 *  la información de dicha insercción
                 * 
                */ 
                
                const userData = await userService.getUser()
                let data
                
                if(userData.length === 0){
                    data = await userService.insertUser(nombre,apellidos,email, await Security.encryptPassword(password),"ADMIN")
                }else if(userData.length !== 0 && !roles){
                    data = await userService.insertUser(nombre,apellidos,email, await Security.encryptPassword(password),"USER")
                }
                else{
                    data = await userService.insertUser(nombre,apellidos,email, await Security.encryptPassword(password),roles)
                }

                // recojemos el id que se le a asignado al usuario nuevo con los datos que nos devuelve
                const newId = data.insertId
                
                //creamos un token a partir del id dado del usuario
                const token = jwt.sign({id:newId},
                    keys.KEYTOKEN,
                    {expiresIn:28800} // fecha de expiración del token en 24 horas
    
                )
                // enviamos un mensaje con el codigo de que todo ha salido bien y con el token adjunto
                
                res.status(httpCodes.OK)
                res.send({
                    statusCode:httpCodes.OK,
                    statusMessage: "oK",
                    message:"user register sucefully",
                    token
                })
            }catch(err){

                // en caso de falla enviamos un codigo 500 correspondiente a una posible caida del servidor
                res.status(httpCodes.INTERNAL_SERVER_ERROR)
                res.send({
                    statusCode:httpCodes.INTERNAL_SERVER_ERROR,
                    statusMessage:"error internal Server",
                    message:"error server falled"
                })
            }
        }else{
            res.status(httpCodes.BAD_REQUEST)
            res.send({
                message:"unknow rol"
            })
        }
        
    }else{

        /**
         * en caso de que falte alguna variable se respondera con el codigo BAD REQUEST
         *  adjunto con un objeto con especificaciones del error
         */
        res.status(httpCodes.BAD_REQUEST)
        res.send({
            statusCode:httpCodes.BAD_REQUEST,
            statusMessage:"Bad Request",
            message:"require params"
        })
    }
   
}


// controlador que maneja las peticiones para logear un usuario

export const sigIn = async (req, res) =>{
    const {email, password} = req.body
    
    if (email&&password){
        
        try{
            const userFound = await userService.getUserByEmail(email)
            
            if(!userFound){
                res.status(httpCodes.NOT_FOUND)
                res.send(
                    {
                        statusCode:httpCodes.NOT_FOUND,
                        statusMessage:"not Found",
                        message:"user not found"
                    }
                    
                )
                return 
            }
            
            const isValid = await Security.compareEncryptedPassword(password,userFound.password)
            const message = "password is invalid"
            if(!isValid){
                res.status(httpCodes.FORBIDEN)
                res.send({
                    statusCode: httpCodes.FORBIDEN,
                    statusMessage: "forbiden",
                    message})
                return
            } 
            
            
            const token = jwt.sign({id:userFound.idusuario},
                keys.KEYTOKEN,
                {expiresIn:28800})
            
            res.send({token})
            
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
            statusMessage:"Bad Request",
            message:"require params"
        })
    }
}

export const deleteUserController = async(req, res) =>{
    const {id} = req.params
    if(id){
        try{
            const data = userService.deleteUser(id)
            res.status(httpCodes.OK)
            res.send({
                statusCode: httpCodes.OK,
                statusMessage:"Ok",
                message:"user delete sucesfully"
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
            statusMessage:"Bad Request",
            message:"require params"
        })
    }
}

export const updateUserController = async(req,res) =>{
    const {id} = req.params
    const {nombre, apellidos, email,roles} = req.body
    if(nombre&&apellidos&&email&&roles&&id){
        try{
            const data = await userService.updateUser(nombre, apellidos, email,roles,id)
            res.status(httpCodes.OK)
            res.send({
                statusCode: httpCodes.OK,
                statusMessage:"Ok",
                message:"user update sucesfully"
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
            statusMessage:"Bad Request",
            message:"require params"
        })
    }
}

export const getUsersByIdController = async(req,res) =>{
    const {id} = req.params

    if(id){
        try{
            const data = await userService.getUserById(id)
            res.status(!data ? httpCodes.NOT_FOUND : httpCodes.OK)
            res.send({
                statusCode: !data ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: !data ? "not found" : "ok",
                message:!data ? "user not found":" user found sucesfully",
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
            statusMessage:"Bad Request",
            message:"require params"
        })
    }
}

export const updatePasswordController = async (req, res) =>{
    const {password} = req.body
    const {id} = req.params

    if(password, id){
        try{
            
            await userService.updatePassword(await Security.encryptPassword(password),id)
            
            res.status(httpCodes.OK)
            res.send({
                statusCode:httpCodes.OK,
                statusMessage: "ok",
                message:"update password susesfully"
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
            statusMessage:"Bad Request",
            message:"require params"
        })
    }
}




