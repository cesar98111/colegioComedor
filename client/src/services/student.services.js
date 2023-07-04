const url = "http://localhost:8000/api/alu"


export const insertStudent = async (student,token) =>{
    console.log(student)
    try{
        const response = await fetch(`${url}/insert`,{
            method:"POST",
            body:JSON.stringify({
                name:student.nombre,
                lastName:student.apellidos,
                course:student.curso,
                dining:student.comedor,
                etage:student.etapa,
                dischargeDate:student.baja,
                days:student.dias,
                allergies:student.alergias,
                asistance:student.asistencia
            }),
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })
        console.log(response)
    }catch(err){
        console.log(err)
    }
}

export const getStudentsByCourse = async (etage, course) =>{
    try {
        const response = await fetch(`${url}/getByCourse/${course}/${etage}`)

        const data = await response.json()
        if( data.statusCode === 404){
            
            return []
        }else{
            return data.data
        }
        
    }catch(err){
        console.log(err)
        return []
    }
}
export const getStudentByName = async (name, course, etage) =>{
    try{
        const response = await fetch(`${url}/getByCourse/${name}/${course}/${etage}`)

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
export const updateStudent = async (student,token) =>{
    try{
        const response = await fetch(`${url}/update/${student.id}`,{
            method:"PUT",
            body:JSON.stringify({
               dining: student.comedor,
               days: student.days,
               allergies:student.alergies
            }),
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })
        console.log(response)
    }catch(err){
        console.log(err)
    }
}

export const getAluByToDay = async (course, etage) =>{
    try{
        const response = await fetch(`${url}/getByToDay/${course}/${etage}`)

        const data = await response.json()
        if(data.statusCode !== 200){
            return []
        }else{
            return data.data
        }
    }catch(err){
        return []
    }
    
}

export const getHighsByName = async (name, token) =>{
    try{
        const response = await fetch(`${url}/highs/${name}`,{
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
        return []
    }
}

export const getLikeAlu = async(name, etage, course, token) =>{
    try{

        const response = await fetch(`${url}/ike/${name}/${course}/${etage}`,{
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
        return []
    }
} 