import { useEffect, useState } from "react";
const NumberInput=({model,id,description,validation})=>{

    const[value,setValue]=useState(model[id]);

    useEffect(()=>{
        setValue(model[id]);
    },[model,id]);
    const handleChange=(e)=>{
        setValue(e.target.value);
        model[id]=Number(e.target.value);
    }
    return(
        <>
        <label htmlFor={id}><b>{description}:</b></label>
        <input className="form-control" {...validation} id={id} value={value} type="number" onChange={handleChange} />
        </>
    )
}

export default NumberInput;