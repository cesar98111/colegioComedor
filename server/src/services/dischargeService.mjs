import db from "../config/db.mjs"

export const  DischarRecordInsert = async(id,alta,baja) =>{
    console.log(id,alta,baja)
    const sql = "INSERT INTO altas (alta,baja,alumno)  VALUE(?,?,?)"
    
    const result =  await db.query(sql,[alta,baja,id])

    return result 
}