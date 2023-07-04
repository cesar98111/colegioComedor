const url = "http://localhost:8000/api/day"

export const insertAsistances= async () =>{
    try{
        const response  = await fetch(`${url}/insert/asistance`,{
            method:"POST"
        })

        console.log(await response.json())
    }catch(err){
        console.log(err)
    }
}

export const updateAsistance = async (nombre,asistance) =>{
    try{
       await fetch(`${url}/asistance/update`,{
            method:"PUT",
            body:JSON.stringify({
                asistance: asistance,
                nombre: nombre
            }),
            headers:{
                'Content-type':'application/json'
            }
        })
    }catch(err){
        console.log(err)
    }
}
export const updateAsistanceDayName = async (asistance,name,date,token)=>{
    try{
        const response = await fetch(`${url}/update/${asistance}`,{
            method:"PUT",
            body:JSON.stringify({
                name:name,
                date:date
            }),
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })

        console.log(await response.json())
    }catch(err){
        console.log(err)
    }
}
export const getAsistanceToDay = async (name)=>{
    try{
       const response = await fetch(`${url}/get/${name}`)

       const data = await response.json()
        console.log(data)
       return data.data[0]
    }catch(err){
        console.log(err)
    }
}

export const getDayByname = async (name,token) =>{
    try{
        const response  = await fetch(`${url}/getByName/${name}`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })
        
        const data = await response.json()

        if(data.statusCode === 200){
            return data.data
        }else{
            return []
        }
    }catch(err){
        console.log(err)

        return []
    }
}

export const getBetewnDate = async(firstDate,lastDate,name,token) =>{
    try{
        const response = await fetch(`${url}/getBetewnDate`,{
            method:"POST",
            body:JSON.stringify({
                firstDate:firstDate,
                lastDate:lastDate,
                name:name
            }),
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })

        const data = await response.json()
        if(data.statusCode === 200){
            return data.data
        }else{
            return []
        }
    }catch(err){
        console.log()
        return[]
    }
}

export const insertSpcificDay = async(id)=>{
    try{
        await fetch(`${url}/insert/spcific/${id}`,{
            method:"POST"
        })

        
    }catch(err){
        console.log(err)
    }
}