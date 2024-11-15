import { useEffect, useState } from "react";

const PasswordInput=({model,id,description,validation})=>{

    const[value,setValue]=useState(model[id]);

    useEffect(()=>{
        setValue(model[id]);
    },[model,id]);
    const handleChange=(e)=>{
        setValue(e.target.value);
        model[id]=e.target.value;
    }
    return(
        <>
        <label htmlFor={id}><b>{description}:</b></label>
        <input className="form-control" {...validation} id={id} value={value} type="password" onChange={handleChange} />
        </>
    )
}

export default PasswordInput;