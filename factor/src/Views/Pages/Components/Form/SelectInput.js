import { useEffect, useState } from "react";
const SelectInput=({model,id,description,list,text,validation})=>{

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
        <select className="form-select" {...validation} id={id} value={value} onChange={handleChange}>
                {
                    list.map((val) => {
                        return <option key={val.id} value={val.id}>{val[text]}</option>
                    })
                }
            </select>
        </>
    )
}

export default SelectInput;