import * as serviceAlu from "../services/aluService.mjs"
import * as serviceCourse from "../services/courseService.mjs"
import httpCodes from "../error/httpCodes.mjs"


export const insertAluController = async (req, res) =>{
    const {name, course,dining,etage,dischargeDate,days,allergies,asistance} = req.body
    if(name,course,etage){
        try{
            const courseId = await serviceCourse.getCourseId(course,etage)
            
            const data = await serviceAlu.insertAlu(name, courseId,dining === "si"? 1 : 0,dischargeDate,days,allergies === "si" ? 1: 0,1)
            res.status(httpCodes.OK)
            res.send({
                statusCode:httpCodes.OK,
                statusMessage:"ok",
                message:"data insert sucesfull",
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

export const updateAluController = async (req, res) =>{
    const {id} = req.params
    
    const {dining,days,allergies} = req.body
    
    if(dining || days ||allergies){
        
        try{
            const data = await serviceAlu.updateAlu(dining === "si" || dining!== null ? 1: 0,days,allergies === "si" || dining !== null ? 1: 0,id)
            
            res.status(httpCodes.OK)
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: "oK",
                message:"update data sucesfully"
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
            message:"params is required"
        })
    }
}

export const getAluByCourseController = async (req,res) =>{
    const {course, etage} = req.params

    if(course,etage){
        try{
            const data = await serviceAlu.getAluByCourse(etage,course)

            res.status(data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK)
            res.send({
                statusCode: data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: data.length === 0 ? "not found" : "ok",
                message: data.length === 0 ? "students not found": "students found sucesfully",
                data: data.length === 0 ? null : data
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
            message:"params is required"
        })
    }
}
export const getAluByNameAndCourseController = async (req,res) =>{
    const {name,course, etage} = req.params
    console.log(name,course, etage)
    if(name,course,etage){
        try{
            const data = await serviceAlu.getAluByNameAndCourse(name,etage,course)

            res.status(data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK)
            res.send({
                statusCode: data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: data.length === 0 ? "not found" : "ok",
                message: data.length === 0 ? "students not found": "students found sucesfully",
                data: data.length === 0 ? null : data
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
            message:"params is required"
        })
    }
}
export const getAluByToDay = async (req, res) =>{
    const {etage,course} = req.params
    try{
        const toDay = new Date()
        const week = ["D","L","M","X","J","V","S"]
        const data = await serviceAlu.getAluByCourse(etage, course)
        console.log(etage,course)
        const studentToDay = data.filter((value)=>{
            if(value.dias !== null){
                if(value.dias.indexOf(week[toDay.getDay()]) !== -1){
                    return value
                }
            }
        })
        res.status(studentToDay.length === 0 ? httpCodes.NOT_FOUND: httpCodes.OK)
        res.send({
            statusCode: httpCodes.OK,
            statusMessage:studentToDay.length === 0 ?"not found":"ok",
            message: studentToDay.length === 0 ?"students not found": "student found sucesfully", 
            data:studentToDay
        })
        
    }catch(err){
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({
            statusCode: httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage: "internal server error",
            message: "server has fallen"
        })
    }
}

export const highByNameController = async(req, res) =>{
    const {name} = req.params

    if(name){
        try{
            const data = await serviceAlu.getHighByName(name)

            res.status(data.length === 0 ?httpCodes.NOT_FOUND : httpCodes.OK)
            res.send({
                statusCode: data.length === 0 ?httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: data.length === 0 ? "Not found" : "ok",
                message: data.length === 0 ? "highs not found" : "highs found susesfully",
                data
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
            message:"params is required"
        })
    }
}

export const getLikeNameAlu = async (req, res) =>{
    const {name, etage, course} = req.params
    if(name,course,etage){
        try{
            console.log("ho")
            const data = await serviceAlu.getLikeNameAlu(name,etage,course)

            res.status(data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK)
            res.send({
                statusCode: data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: data.length === 0 ? "not found" : "ok",
                message: data.length === 0 ? "students not found": "students found sucesfully",
                data: data.length === 0 ? null : data
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
            message:"params is required"
        })
    }
    
}

export const getAluByIdController = async (req,res) =>{
    if(!id){
        res.status(httpCodes.BAD_REQUEST),
        res.send({message:"badRequest"})
    }else{
        try{
            const data = await serviceAlu.getAluById(id)

            res.status(httpCodes.OK)
            res.send(data)
        }catch(err){
            res.status(httpCodes.INTERNAL_SERVER_ERROR)
            res.send({message:"internalServerError"})
        }
    }
}

