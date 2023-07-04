import { startServer, stopServer } from "./server/server.mjs";




const runAplication = () =>{
    
    startServer() // metodo que inicia el servidor
}



/**
 *funcion que para la aplicacion
 */
const stopAplication = () =>{
    stopServer()
    process.exit(0)
}

process.on('SGINT',() => stopAplication())
process.on('SIGTERM', () => stopAplication())
process.on('exit', () => console.log('Exitin Express Server'))

/** llama a la funcion para que la aplicación empiece a corre el servidor */
runAplication()