import db from "../config/db.mjs"

const getUserCount = async ()=>{
    const sql = "SELECT count(*) as Nusers FROM usuario"

    const [result] = await db.query(sql)

    return result[0].Nusers
}

const getUser = async ()=>{
    const sql = "SELECT * FROM usuario "

    const [result] = await db.query(sql)

    return result
}

const getUserByEmail = async (email)=>{
    const sql = "SELECT * FROM usuario WHERE email = ?"

    const [result] = await db.query(sql,[email])
    
    return result[0]
}

const getUserByName = async (name)=>{
    const sql = "SELECT * FROM usuario WHERE nombre = ?"

    const [result] = await db.query(sql,[name])

    return result[0]
}

const  getUserById = async (id)=>{
    console.log(id)
    const sql = "SELECT * FROM usuario WHERE idusuario = ?"
    const [result] = await db.query (sql,[id])
    return result[0]
}

const insertUser = async (nombre,apellidos,email,password,roles)=>{
    console.log(nombre)
    const sql= "INSERT INTO usuario (nombre, apellidos, email, password, roles) VALUES(?,?,?,?,?)"

    const [result] = await db.query(sql,[nombre,apellidos,email,password,roles])

    return result
}
const deleteUser = async (id) =>{
    const sql = "DELETE FROM usuario WHERE idusuario = ?"

    const [result] = await db.query(sql,[id])

    return result
}

const updateUser = async (nombre, apellidos, email,roles,id) =>{
    console.log(nombre)
    const sql ="UPDATE usuario SET nombre=?, apellidos=?, email=?, roles=? Where idusuario = ?;"

    const [result] = await db.query(sql,[nombre, apellidos, email ,roles,id])

    return result
}

const updatePassword = async (password, id) =>{
    
    const sql = `UPDATE usuario SET password = ? WHERE idUsuario = ?; `
    
    const [result] = await db.query(sql,[password,id])
    console.log("holaa")
    return result
}



export {
    getUser,
    insertUser,
    getUserByEmail,
    getUserByName,
    getUserCount,
    getUserById,
    deleteUser,
    updateUser,
    updatePassword
}
