const url = "http://localhost:8000/api/discharge"

export const dischargeInsert = async(id, alta, baja, token) =>{
    try{
        const response = await fetch(`${url}/insert/${id}`,{
            method:"POST",
            body:JSON.stringify({
                alta:alta,
                baja:baja
            }),
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