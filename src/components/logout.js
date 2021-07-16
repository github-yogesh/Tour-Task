import React, {useEffect,  useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { userContext } from '../App'

const Logout =  () => {

    const history = useHistory()
    const{state, dispatch} = useContext(userContext)

    useEffect( async () => {

        try{

            const res = await fetch('/logout', {
                method:'GET',
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json"
                },
                credentials:'include'
    
            })
    
            const data = await res.json()
            
            if(!res.status === 200 || !data){
                const error = new Error(error)
                throw error
            }else{
                
                dispatch({type:"USER", payload:false})
                alert("Logged Out sucesfully")
                history.push('/login')
            }
    
        }catch(err){
            
            console.log(err)
            history.push('/login')
        }
       
    }, [])

  
    return (
        <div>
            <h1>Loged out</h1>
        </div>
    )
}

export default Logout
