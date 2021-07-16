import React, {useState} from 'react'
import Reg from "../img/reg.jpg"
import { NavLink, useHistory } from 'react-router-dom'

const Signup = () => {
    const history = useHistory()
    const mystyle = {

        height: "250px",
     
    }

    const inputs = {
        border:'none', borderBottom: '1px solid #1890ff', outline: 'none'
    }

    const [user, setuser] = useState({
        name:"", email:"", password:"", cpassword:""
    })

   let name, value 
   const handleInput = (e) =>{
       e.preventDefault()
       name = e.target.name
       value = e.target.value
       setuser({...user, [name]:value})
   }

   const dataSub = async (e) =>{
    e.preventDefault()
       
    const{ name, email, password, cpassword} = user

    const res = await fetch("/register", {

        method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  
            name, email, password, cpassword
            
          })

    })

    const data = await res.json()

    if(res.status === 400 || !data){
        alert("please fill all details")
    }else if(res.status === 422 || !data){
        alert("Sorry e-mail already exits")
    }else{
        alert("Register sucessfully")
        history.push("/login")
    }




   }

    return (
        <>
            <div className="container d-flex justify-content-center my-5">
                <div className="row ">
                    <div className="col text-center px-5 py-5">
                    <blockquote class="blockquote text-center">
                            <h2 class="mb-0"><b>Register</b></h2>
                    </blockquote>
                    <br/>
                        <form className="" onSubmit={dataSub} method="POST">
                        <i className='fas fa-user-alt d-inline px-2' style={{fontSize:24}}></i>
                            <input type="text" className="d-inline" 
                            value={user.name}
                            onChange={handleInput}
                             placeholder="Name.."  style={inputs}  name="name" autoComplete="off" /><br/><br/>
                        <i className='fas fa-mail-bulk d-inline px-2' style={{fontSize:24}}></i>    
                            <input type="email" className="d-inline" 
                            value={user.email}
                            onChange={handleInput}
                             placeholder="Email.." style={inputs}  name="email" autoComplete="off" /><br/><br/>
                        <i className='fas fa-lock d-inline px-2' style={{fontSize:24}}></i>    
                            <input type="password" className="d-inline" 
                            value={user.password}
                            onChange={handleInput}
                             placeholder="Password.." style={inputs}   name="password" autoComplete="off" /><br/><br/>
                        <i className='fas fa-lock d-inline px-2' style={{fontSize:24}}></i>
                            <input type="password" className="d-inline" 
                            value={user.cpassword}
                            onChange={handleInput}
                             placeholder="Confirm Password.." style={inputs}  name="cpassword" autoComplete="off" /><br/><br/>
                            <input type="submit" value="Register" className="btn btn-primary" />
                        </form>
                       

                    </div>
                    <div className="col text-center">

                    <img src={Reg} alt="Registration img" style={mystyle} className="my-5"/>
                    <div className="">
                    <NavLink to="/login">Already a member? Login.</NavLink>
                    </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
