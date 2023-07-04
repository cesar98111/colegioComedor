import { useState, useEffect } from "react"
import Login from "./Login"
import Register from "./Register"
import {getAllUsers}from "../../../services/user.services"

const SigIn = () =>{


    const [userExist, setUserExist] = useState()

    useEffect(()=>{
        const getUser = async () =>{
            setUserExist(await getAllUsers())

        }
        getUser()
    },[])

    return(
        <div className="container-sig-in">
            {
                userExist !== 0 ?
                (<Login/>)
                :
                (<Register/>)
            }
        </div>
    )
}

export default SigIn