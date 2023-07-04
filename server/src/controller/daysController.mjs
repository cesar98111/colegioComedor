import * as serviceDay from "../services/daysServices.mjs"
import {getAlu, getAluById} from "../services/aluService.mjs"
import httpCodes from "../error/httpCodes.mjs"

export const insertAsistance = async (req, res) =>{
    try{
        const week = ["D","L","M","X","J","V","S"]
        const data = await getAlu()
        console.log(data)
        data.forEach(async (value)=>{
            if(value.dias !== null){
                const day=value.dias.split(',')

                if(day.indexOf(week[new Date().getDay()]) != -1){
                    
                    const result = await serviceDay.insertAsistance(0)  
                    await serviceDay.insertRelationAsistance(result[0].insertId,value.idAlumno)
                
                }
            } 
        })
        
        res.send({meesage:"data found"})
    }catch{
        
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({
            statusCode:httpCodes.INTERNAL_SERVER_ERROR,
            statusMessage:"internal server error",
            message:"server has fallen"
        })
    }
}


export const updateAsistance = async (req, res) =>{
    
    const{asistance, nombre} = req.body

    if(asistance,nombre){
        try{
            console.log(nombre)
            const data = await serviceDay.updateAsistance(nombre, asistance)
            
    
            res.status(httpCodes.OK)
            res.send({
                statusCode:httpCodes.OK,
                statusMessage:"ok",
                message:"update sucesfully"
            })
            
        }catch(err){
            console.log("hoal")
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
            messageStatus:"bad request",
            message:"params require"
        })
    }
    
}

export const getDayByNameController = async (req, res) =>{
    const {name} = req.params

    if(name){
        try{
            const data = await serviceDay.getAsistanceByNameDate(name)
            console.log(data)
            res.status(data.length === 0 ? httpCodes.NOT_FOUND: httpCodes.OK)
            res.send({
                data:data
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
            statusMessage:"bad Request",
            message:"paramas required"
        })
    }
}

export const getDayByName = async(req, res) =>{
    const{name} = req.params

    if(name){
        try{
            const data = await serviceDay.getAsistanceByName(name)

            res.status(data.length === 0 ? httpCodes.NOT_FOUND: httpCodes.OK)
            res.send({
                statusCode: data.length === 0 ? httpCodes.NOT_FOUND: httpCodes.OK,
                statusMsaage: data.length === 0 ? "not found" :"ok",
                message: data.length === 0 ? "days not found": "days found sucesfully",
                data: data.length === 0 ? null : data 
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
            statusMessage:"bad Request",
            message:"paramas required"
        })
    }
}

export const updateDaysByNameDateController = async(req, res) =>{
    const {name, date} = req.body
    const {asistencia} = req.params
    if(name,date,asistencia){
        try{   
            await serviceDay.updateAsistanceByNameDate(asistencia,name,date)


            res.status(httpCodes.OK)
            res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "asistance Update sucesfully"
            })

        }catch(err){
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
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "bad Request",
            message: "params required"
        })
    }
}

export const getasistanceBeteewnDatesController = async (req, res) =>{
    const {firstDate,lastDate,name} = req.body

    if(firstDate, lastDate, name){
        try{
            const data = await serviceDay.getAsistanceBetewnDates(firstDate,lastDate,name)
            console.log(data.length)
            res.status(data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK)
            
            res.send({
                statusCode: data.length === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: data.length === 0 ? "not foud" : "ok",
                message: data.length === 0 ? "dates not found" : "dates found sucesfully",
                data: data.length === 0 ? null : data
            })
        }catch(err){
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
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "bad Request",
            message: "params required"
        })
    }
}

export const insertAspcificDay = async(req, res) =>{
    const {id,asistance} = req.params

    try{
        const result = await serviceDay.insertAsistance(0)  
        const data = await serviceDay.insertRelationAsistance(result[0].insertId,id)
        res.status(httpCodes.OK)
        res.send({message:"add susecfully"})
    }catch(err){
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
        res.send({error:"500 "})
    }
}