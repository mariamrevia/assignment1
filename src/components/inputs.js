import React from 'react'

function Inputs({name,note,handleChange,formDataName,error}
 ) {
   
  
  return (
    <div style={{"height":134}}>
         <div className='input--name'>
            <h3 className={error ? "h3-P-err": ""}>{name}</h3>
            <input 
            className= {error ? "input--err" : "input--"}
            type="Text"
            onChange={(e) => handleChange(e)}
            name={formDataName}
            ></input>
            <p className={error ? "h3-P-err": ""}>
            {error? error :note}
            </p>
          </div>
    </div>
  )
}

export default Inputs