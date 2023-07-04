import db from "../config/db.mjs"
import keys from "../security/keys.mjs"

export const insertAlu = async (name,  course,dining,dischargeDate,days,allergies,asistance) =>{
   
    const sql = `INSERT INTO alumno (nombre,curso,comedor,fecha_baja,dias,alergias,asistencias) VALUES (aes_encrypt(?,"${keys.KEYALU}"),?,?,?,?,?,?);`
    const [result] = await db.query(sql,[name,  course,dining,dischargeDate,days,allergies,asistance])
    
    return result
}

export const updateAlu = async (dining,days,alta,baja,allergies,id) =>{
    const sql = "UPDATE alumno set dias =? ,alergias=? ,fecha_alta=?,fecha_baja=?, comedor=? WHERE idAlumno = ?;"

    const [result] = await db.query(sql,[days,allergies,alta,baja,dining,id])

    return result
}

export const getAlu= async () =>{
    const sql = "SELECT * FROM alumno"

    const [result] = await db.query(sql)

    return result
}

export const getAluByCourse = async (etage,course) =>{
    const sql = `SELECT idAlumno, cast(aes_decrypt(nombre,"${keys.KEYALU}") as char) as nombre, comedor, fecha_alta, fecha_baja, dias, alergias, asistencias FROM alumno 
    INNER JOIN cursos ON alumno.curso = cursos.idCurso
    WHERE etapa = ? AND cursos.curso = ?; `
    
    
    const [result ] = await db.query(sql,[etage,course])

    return result

}

export const getAluByNameAndCourse = async  (name, etage,course) =>{

    const sql = `SELECT idAlumno, cast(aes_decrypt(nombre,"${keys.KEYALU}") as char) as nombre, comedor, fecha_alta, fecha_baja, dias, alergias, asistencias FROM alumno 
    INNER JOIN cursos ON alumno.curso = cursos.idCurso
    WHERE etapa = ? AND cursos.curso = ? AND aes_decrypt(alumno.nombre,"${keys.KEYALU}") = ?
    ORDER BY aes_decrypt(alumno.nombre,"${keys.KEYALU}") ASC; `
    
    
    const [result ] = await db.query(sql,[etage,course,name])

    return result
}

export const getHighByName = async (name) =>{
    const sql = `SELECT id, Cast(aes_decrypt(nombre,"${keys.KEYALU}") as char) as nombre , alta, baja FROM  alumno
    INNER JOIN altas ON alumno = idAlumno
    WHERE aes_decrypt(nombre,"${keys.KEYALU}") = ?;`

    const [result] = await db.query(sql,[name])

    return result

}

export const getLikeNameAlu = async (name,etage,curso) =>{
    console.log(name,etage,curso)
    const sql = `SELECT idAlumno , cast(aes_decrypt(nombre,"${keys.KEYALU}")as char) AS nombre , cursos.curso, etapa
    from alumno
    INNER JOIN cursos ON idCurso = alumno.curso
    WHERE etapa = ? AND cursos.curso = ? AND aes_decrypt(nombre,"${keys.KEYALU}") LIKE '${name}%';`

    const [result] = await db.query(sql,[etage,curso])

    return result
}

export const getAluById = async (id) =>{
    const sql = "SELECT * FROM alumno WHERE idAlumno = ?"

    const [result] = await db.query(sql, [id])

    return result
}










