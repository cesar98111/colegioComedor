import bcrypt from 'bcryptjs'

// funcion que se encarga de encriptar la contraseña
export const encryptPassword = async(password)=>{
    // se establece el numero de ejecuciones de el algoritmo de encriptacion
    const salt = await bcrypt.genSalt(10)
    /* se encripta la contraseña pasada por parametro 
    y se devuelve */
    return await bcrypt.hash(password, salt)
}
/* funcion que se encarga de comparar la nueva contraseña con 
la que ya esta establecida */
export const compareEncryptedPassword = async(newPassword, password)=>{
    /* devuelve true en el caso de que sean iguales y false en 
    el caso contrario*/
    return await bcrypt.compare(newPassword, password)
    
}