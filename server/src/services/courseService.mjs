import db from "../config/db.mjs"


export const getCourseId = async(course,etage) =>{
    console.log(course,etage)
    const sql =`SELECT idCurso FROM cursos WHERE etapa = ? AND curso = ?`;
    
    const result = await db.query(sql,[etage,course])
    console.log(result)
    
    return result[0][0].idCurso

}

export const getCourseByEtage = async (etage) =>{
    const sql ="SELECT * FROM cursos WHERE etapa = ?"

    const result = await db.query(sql,[etage])

    return result[0]
}
