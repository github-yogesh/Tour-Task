import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { MDBDataTable } from 'mdbreact'

const AddDetails = () => {

    const history = useHistory()
    const [resData, setresData] = useState([])
    const [bank, setbank] = useState({
        bnk:"", ifsc:"", user:"", id:""
    })
  
    const inputs = {
        border:'none', borderBottom: '1px solid #1890ff', outline: 'none'
    }

    const  callUser = async () => {
    
// get user details
    try{

        const res = await fetch('/addDetails', {
            method:'GET',
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            credentials:'include'

        })

        const data = await res.json()
        console.log(data[0]["email"])
        setbank({...bank, user:data[0]["email"], bnk:"", ifsc:"", id:""})
        
        if(!res.status === 200 || !data){
            const error = new Error(error)
            throw error
        }

    }catch(err){
        
        console.log(err)
        history.push('/login')
    }

    //get bank details
try{

    const res = await fetch('/bnkDetails', {
        method:'GET',
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        credentials:'include'

    })

    const data = await res.json()
    setresData(data)
    
    

}catch(err){
    console.log(err)
    history.push('/login')
}

}

// take user input
let name, value
const handleInput = (e) =>{

    e.preventDefault()

    name = e.target.name
    value = e.target.value

    setbank({...bank, [name]: value})
}

//update
let nameup, valueup
const updateInput = (e) =>{

    e.preventDefault()

    nameup = e.target.name
    valueup = e.target.value

    setbank({...bank, [nameup]: valueup})
}

//update to databse
const upSubmit = async (e) =>{
    e.preventDefault()
    const {bnk, ifsc , id} = bank


    const res = await fetch('/upDetails', {

        method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  
            bnk, ifsc, id
            
          })
    })

    const data = await res.json()

    if(res.status === 402 || !data)
    {
        alert("Please fill all details")

    }else if(res.status === 405 || !data){
        
        alert("Bank account already exits")

    }else{

        alert("Bank details updated sucesfully")
        e.target.reset()
        callUser()
       
    }

}

//save to database
const bnkSubmit = async (e) =>{

    e.preventDefault()
    
    const {bnk, ifsc, user} = bank

    const res = await fetch('/addDetails', {

        method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  
            bnk, ifsc, user
            
          })
    })

    const data = await res.json()

    if(res.status === 402 || !data)
    {
        alert("Please fill all details")

    }else if(res.status === 405 || !data){
        
        alert("Bank account already exits")

    }else{

         
       
        e.target.reset()
        alert("Bank details added sucesfully")
        callUser()
       
    }
    
}

//del
const delSubmit = async  (e) =>{

    e.preventDefault()

    const {id} = bank

    const res = await fetch('/delDetails', {

        method:"POST",
        headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  
            id
            
          })
    })

    const data = await res.json()

    if(res.status === 402 || !data)
    {
        alert("Please select  field")

    }else{

        alert("Bank details deleted sucesfully")
        e.target.reset()
        callUser()
       
    }


}

useEffect(() => {
    callUser()
 }, [])  
   
 const [modal, setModal] = useState(false)

 const toggle = () => setModal(!modal)

    return (
        <>
            <div className="container border my-5 px-5 py-5">
            <div className="container my-2 px-5 py-5">
                <h2><b>Add Bank Details</b></h2>
                <form method="POST" onSubmit={bnkSubmit}>
                    <input type="text" value={bank.bnk} onChange={handleInput} placeholder="Bank Account no" required="true" style={inputs} name="bnk" autoComplete="off" />&nbsp;
                    <input type="text" value={bank.ifsc} onChange={handleInput} placeholder="IFSC code" required="true" style={inputs} name="ifsc" autoComplete="off" />&nbsp;
                    <input type="submit" value="Add" className="btn btn-primary" />
                </form>
            </div>
                <table className="table table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">Series no</th>
                            <th scope="col">Account no</th>
                            <th scope="col">IFSC code</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {resData.map((resData)=> 
                        <tr>
                            <td>{resData.id}</td>
                            <td>{resData.acc_no}</td>
                            <td>{resData.ifsc}</td>
                            <td>
    <Button color="primary" onClick={() => {toggle(); setbank({...bank, id:resData.id})} }>Edit</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Bank details to be updated for Series {bank.id}</ModalHeader>
        <ModalBody >
        <div className="container border my-5 px-5 py-5">
        <form onSubmit={upSubmit}>
              <input type="text" required='true' value={bank.bnk} onChange={updateInput} name="bnk"  placeholder={"Account No"} style={inputs}  autoComplete=""/>&nbsp;
              <input type="text" required='true' value={bank.ifsc} onChange={updateInput} name="ifsc" placeholder={"IFSC"} style={inputs} autoComplete="" />
              <br/><br/>
              <input type="submit" className="btn btn-primary"/>
          </form>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
                            </td>
                            <td>
                     <form onSubmit={delSubmit}>
            <input type="submit" onClick={() => setbank({...bank, id:resData.id})} value="Delete"   className="btn btn-danger" />
                            </form>
                            </td>
                        </tr>
                        )}
                       
                    </tbody>
                </table>
            </div>   
        </>
    )   
}

export default AddDetails
