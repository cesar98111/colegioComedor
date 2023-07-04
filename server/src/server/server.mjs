import express from "express"
import {createServer} from "http"
import cors from "cors"
import helmet from "helmet"
import userRoutes from "../routes/userRoutes.mjs"
import aluRoutes from "../routes/aluRoutes.mjs"
import daysRoutes from "../routes/dayRoutes.mjs"
import courseRoutes from "../routes/coursRoutes.mjs"
import discharge  from "../routes/dischargeRoutes.mjs"

import {Server} from "socket.io"
import * as serviceStudent from "../services/aluService.mjs"
// creamos constate de express
const app = express()


//creamos los lista de midlewares

/* añade las politicas de cors para que el servidor pueda responder 
a las peticiones desde el navegador */
app.use(cors())

/*
inabilita las etiquetas que da información sobre la version de express 
y la de las librerias que estamos utilizando
*/
app.disable('x-powered-by')
app.disable('etag')
app.use(helmet())

/* habilita al servidor para que pueda
    recibir datos en formato json
*/
app.use(express.json())

// define las rutas principales antes de iniciar el server
app.use('/api/user', userRoutes) 

app.use('/api/alu',aluRoutes)

app.use('/api/day',daysRoutes)

app.use('/api/course',courseRoutes)

app.use('/api/discharge',discharge)

const server = createServer(app)

const io = new Server(server,{
    cors:{
        origin:"*",
        method:["GET","POST"]
    },
    

})



io.on("connection",(socket)=>{
    console.log("socket en escucha")
    socket.on("send_message", async ({student,etage, course}) =>{
        
        
        const {comedor,days,alergias,alta,baja,id} = student
        console.log(days)
        try{
            
            await serviceStudent.updateAlu(comedor=== undefined ? 0: comedor, days,alta,baja, alergias === undefined? 0:alergias, id )
            const data = await serviceStudent.getAluByCourse(etage,course)
            socket.emit("recieve_message",data)
        }catch(err){
            console.log(err)
        }
        
    })

    
})

// funcion que inicia el servidor y define el puerto de escucha en el 8000
const startServer = () =>{
    server.listen(8000,()=>{
        console.log("iniciando servidor")
    })
}

// funcion que cierra el servidor
const stopServer = ()=>{
    server.close()
}



export {
    startServer,
    stopServer
}