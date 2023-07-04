
import {  useState, useEffect } from "react"
import { Link } from "react-router-dom"
import * as daysAsistances from "../../services/days.service"


const Home = () =>{
    
    useEffect (()=>{
        const insertAsistances = async () =>{
            await daysAsistances.insertAsistances()
        }
        insertAsistances()
    },[])
    
 
    
   
    return (
        
        <div className="initContainer">
            <img src="/colegio.jpg"  className="backgroundImage" alt="" />
            <div className="drawContainer">
                <input type="radio"  name="slider" id="item-1" defaultChecked/>
                <input type="radio"  name="slider" id="item-2" />
                <input type="radio"  name="slider" id="item-3" />
                <div className="draw">
                
                    <label className="selectStage" for="item-1" id="selector-1">
                                
                                <img src="./infantil.jpg" alt="" className="stageImage"/>
                                <Link className="buttonEtage" to="/course/INFANTIL">INFANTIL</Link>
                             
                            
                    </label>
                    <label className="selectStage" for="item-2" id="selector-2">
                            
                                <img src="./primaria.png" alt="" className="stageImage"/>
                                <Link className="buttonEtage" to="/course/PRIMARIA">PRIMARIA</Link>
                               
                            
                    </label>
                    <label className="selectStage" for="item-3" id="selector-3">
                                <img src="./secundaria.jpg" alt="" className="stageImage"/>
                                <Link className="buttonEtage" to="/course/SECUNDARIA">SECUNDARIA</Link>          
                    </label>
                </div>
            </div>
            
            
              
            
        </div>

    )
}

export default Home