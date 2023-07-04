import db from "../config/db.mjs"
import keys from "../security/keys.mjs"

export const getTodayAsistance = async() =>{
    const sql = `SELECT CAST(aes_decrypt(nombre,"${keys.KEYALU}")as char) as nombre,asistencia, fecha FROM asiste
    INNER JOIN alumno ON alumno.idAlumno = asiste.alumno
    INNER JOIN dias ON asiste.dias = dias.idDia
    WHERE DATE_FORMAT(fecha, '%Y/%m/%d') = DATE_FORMAT(NOW(), '%Y/%m/%d')`

    const [result] = await db.query(sql)

    return result
}
export const insertAsistance = async (asistance) =>{
    const sql = "INSERT INTO dias (asistencia) VALUE (?);"

    const result = await db.query(sql,[asistance])

    return result
}

export const updateAsistance = async (nombre, asistance) =>{
    
    const sql = `UPDATE asiste
    INNER JOIN dias ON dias.idDia = asiste.dias
    INNER JOIN  alumno ON asiste.alumno = alumno.idAlumno
    SET asistencia = ?
    WHERE DATE_FORMAT(dias.fecha, '%Y/%m/%d') = DATE_FORMAT(NOW(), '%Y/%m/%d') AND aes_decrypt(nombre,"${keys.KEYALU}") = ?;`
    
    const result = await db.query(sql,[asistance, nombre])
    
    return result 
}

export const insertRelationAsistance = async (dias,alumno) =>{
    const sql = "INSERT INTO asiste VALUE (?,?);"

    const [result] = await db.query(sql,[dias,alumno])

    return result
}

export const getAsistanceByNameDate = async (name) =>{
    const sql = `SELECT cast(aes_decrypt(nombre,"${keys.KEYALU}") as char) as nombre, asistencia FROM asiste
    INNER JOIN dias on asiste.dias = dias.idDia
    INNER JOIN alumno on asiste.alumno = alumno.idAlumno
    WHERE aes_decrypt(nombre,'papaya')  = ? AND DATE_FORMAT(dias.fecha, '%Y/%m/%d') = DATE_FORMAT(NOW(), '%Y/%m/%d');`

    const [result] = await db.query(sql,[name])

    return result
}
export const getAsistanceBetewnDates = async (firstDate , lastDate, name) =>{
    console.log(firstDate, lastDate)
    const sql = `SELECT  idDia, CAST(aes_decrypt(nombre,"${keys.KEYALU}") as CHAR) as nombre , fecha, asistencia 
                    FROM asiste
                    inner JOIN dias ON  dias.idDia = asiste.dias
                    INNER JOIN alumno ON alumno.idAlumno = asiste.alumno 
                    WHERE date_format(fecha,'%Y/%m/%d' ) BETWEEN date_format(?,'%Y/%m/%d') AND date_format(?,'%Y/%m/%d')
                    AND aes_decrypt(nombre,"${keys.KEYALU}") = ?;`
    const [result] = await db.query(sql,[firstDate,lastDate,name])

    return result
}

export const getAsistanceByName = async (name) =>{
    
    const sql = `SELECT cast(aes_decrypt(nombre,"${keys.KEYALU}") as char) as nombre, fecha, asistencia
    FROM asiste
    INNER JOIN dias on dias.idDia = asiste.dias
    INNER JOIN alumno on alumno.idAlumno = asiste.alumno
    WHERE aes_decrypt(nombre,"${keys.KEYALU}") = ?` 
    
    const [result] = await db.query(sql,[name])
    
    return result
}

export const updateAsistanceByNameDate = async (asistance,name,date) =>{
    const sql = `UPDATE asiste
    INNER JOIN dias ON dias.idDia = asiste.dias
    INNER JOIN alumno ON asiste.alumno = alumno.idAlumno
    SET dias.asistencia = ?
    where date_format(dias.fecha, '%Y/%m/%d') = date_format(?,'%Y/%m/%d' ) AND aes_decrypt(nombre ,"${keys.KEYALU}") = ?;`

    const [result] = await db.query(sql,[asistance,date,name])

    return result
}