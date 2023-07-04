
const url = "http://localhost:8000/api/user"

export const getAllUsers = async ()=>{
    try{
        const response  = await fetch(`${url}/count`)

        const data = await response.json()
        
        return data.NUsers
    }catch(err){
        console.log(err)
    }
    
}
export const getAllUserss = async (token) =>{
    try{
        
        const response = await fetch(`${url}/get`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })
        const data = await response.json()
        
        return data.data
    }catch(err){
        console.log(err)
    }
}
export const resgisterUser = async (user,token) =>{
    console.log(user.nombre,user.apellidos,user.email,user.rol)
    try{
        const response = await fetch(`${url}/register`,{
            method:"POST",
            body:JSON.stringify({
                nombre:user.nombre,
                apellidos:user.apellidos,
                email:user.email,
                roles:user.rol,
                password:user.contraseña
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
export const registerFirstUser = async (user) =>{
    try{
        const response = await fetch(`${url}/register`,{
            method:"POST",
            body:JSON.stringify({
                nombre:user.name,
                apellidos:user.lastName,
                email:user.email,
                password:user.password,
            }),
            headers:{
                'Content-type':'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
        return data

    }catch(err){
        console.log(err)
    }
}


export const loginUser = async (user) =>{
    try{
        const response = await fetch(`${url}/login`,{
            method:"POST",
            body:JSON.stringify({
                email:user.email,
                password:user.password
            }),
            headers:{
                'Content-type':'application/json'
            }

        })

        const data = await response.json()
        
        return data.token
    }catch(err){
        console.log(err)
    }
}

export const getUser = async (token) =>{
    try{
        const response = await fetch(`${url}/userById/${token}`) 

        const data = await response.json()
        console.log(data)
        return data.data
    }catch(err){
        console.log(err)
    }

}

export const getUserByName = async(name,token) =>{
    try{
        const response = await fetch(`${url}/userByName/${name}`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })
        
        const data = await response.json()
        
        if(data.statusCode === 404){
            return[]
        }else{
            return [data.data]
        }
        

    }catch(err){
        console.log("hola")
        return []
    }
}

export const deleteUser = async(id,token) =>{
    try{
        const response = await fetch(`${url}/delete/${id}`,{
            method:"DELETE",
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })
        const data = await response.json()

        return data
    }catch(err){
        console.log(err)
    }
}

export const getUserById = async(id, token) =>{
    try{
        const response = await fetch(`${url}/userId/${id}`,{
            method:"GET",
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })

        const data = await response.json()
        console.log(data)
        return data.data

    }catch(err){
        console.log(err)
    }
}

export const updateUserId = async(id,token,user) =>{
    try{
        const response = await fetch(`${url}/update/${id}`,{
            method:"PUT",
            body:JSON.stringify({
                nombre:user.nombre,
                apellidos:user.apellidos,
                email:user.email,
                roles:user.rol
            }),
            headers:{
                'Content-type':'application/json',
                'x-access-token':token
            }
        })

        const data =await response.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
}

export const upadatePassword = async (password, id, token)=>{
    try{
        const response = await fetch(`${url}/password/${id}`,{
            method:"PUT",
            body:JSON.stringify({
                password:password.password
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