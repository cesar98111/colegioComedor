import { useEffect, useState } from "react"
import * as intoObject from "../../../services/csvIntoObject"
import * as serviceAlu from "../../../services/student.services"
import key from "../../../services/keys.json"


const ImportStudents = () =>{

    const [file, setFile] = useState()
    const [students, setStudents] = useState()
    
    useEffect(()=>{
        if(file){            
            inputFile()
        }
    },[file])

    const inputFile = () =>{
        const fileReader = new FileReader()
        
        
        fileReader.readAsText(file)
        fileReader.onload = () =>{
            setStudents(intoObject.intoCsv(fileReader.result))
            console.log(students)
        }
        fileReader.onerror = () =>{
            console.log(fileReader.error)
        }

    }

    const handlerInputFile =  () =>{
        if(students){
            window.alert("guardando")
            const token = window.localStorage.getItem(key.KEYTOKEN)

            students.forEach(async (element) =>  {
                await serviceAlu.insertStudent(element,token)
            });
            

        }else{
            window.alert("formato no valido")
        }
        setFile("")
       
        
    }

    const handlerDrag = (e) =>{
        e.preventDefault()
        
    }
    const handlerDrop = (e) =>{
        e.preventDefault()
        setFile(e.dataTransfer.files[0])
        

    }

    const loadRender = () =>{
        if(file){
            return(
                <div className="onFile">
                    <img src="/file.png" alt="" style={{height:100,width:100}} />
                    <p>{file.name}</p>
                </div>
            )
        }else{
            return(
                <img src="/descarga.png" alt="" style={{height:150,width:150}} />
            )
        }
    }
    return(
        
            <div className="containerUsers">
                <h1>
                    introduce un file
                </h1>
                <form action="" className="importForm" onDragOver={handlerDrag} onDrop={handlerDrop} onClick={()=> document.querySelector(".input-field").click()}>
                    <input type="file"  onChange={(e) => setFile(e.target.files[0])}  className="input-field" hidden/> 
                    {loadRender()}
                </form>
                <div className="containerFileButton">
                    <button className="buttonDeleteFile" onClick={()=>setFile(null)}>eliminar</button>
                    <button className="buttonConfirmFile" onClick={()=>handlerInputFile()}>enviar</button>
                </div>
            </div>
        
    )
}

export default ImportStudents