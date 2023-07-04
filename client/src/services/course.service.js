const url = "http://localhost:8000/api/course"

export const getCourseByEtage = async (etage) =>{
    try{
        const response  = await fetch(`${url}/get/${etage}`)
        const data = await response.json()

        return data.data
    }catch(err){
        console.log(err)
    }
    
}