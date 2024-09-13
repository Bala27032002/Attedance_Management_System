import { TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function Demo_Register() {
const [name,setName]=useState('')
const [email,setemail]=useState('')
const [phone,setphone]=useState('')

const [errors,setError]=useState({
    name:'',
    email:'',
    phone:''
})
const validName=(value)=>{
    const regex=/^[A-Za-z\s]+$/;
    if(!value){
        return "This field is Required"
    }
    if(value.length<4){
        return "Above 4 character"
    }
    if(!regex.test(value)){
        return 'Full Name can only contain alphabetic characters and spaces';

    }
}
const validEmail =(value)=>{
    const regex =/^[A-Za-z\s]+$/;
    if(!value){
        return "This field is required"
    }
    if(!regex.test(value)){
        return "Enter correct value"
    }
}
const handlenamechange =(e)=>{
const {value}=e.target;
setName(value);
const error =validName(value);  
setError({...errors,name:error});
}
const handleemailchange =(e)=>{
    const {value}=e.target;
    setemail(value);
    const error=validEmail(value)
    setError({...errors,email:error})
}
const handlephonechange =(e)=>{
    setphone(e.target.value)
}

const handlesubmit=(e)=>{
    e.preventDefault();
    const fullNameError = validName(name);
    const fullemailError = validName(email);
    if (fullNameError,fullemailError) {
      setError({ ...errors, name: fullNameError,email:fullemailError });
      return;
    }
const formdata={
    name,
    email,
    phone   
}
console.log(formdata)
};

  return (
    <form onSubmit={handlesubmit} style={{paddingLeft:'7rem'}}>
<Typography>
    Name
</Typography>
<TextField name='Name'
value={name}
onChange={handlenamechange}
error={!!errors.name}
helperText={errors.name}

/>
<Typography>
    email
</Typography>
<TextField name='email'
value={email}
onChange={handleemailchange}
error={!!errors.email}
helperText={errors.email}

/>
<Typography>
    phone
</Typography>
<TextField name='phone'
value={phone}
onChange={handlephonechange}

/>
<button>
    submit
</button>
    </form>
  )
}

export default Demo_Register