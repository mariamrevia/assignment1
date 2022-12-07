import React from 'react'

function Smallinputs({name,note,handleChange,formDataName,error}) {
    return (
        <div>
            <div className='cpu-core'>
                <h3 className={error ? "h3-P-err":""}>{name}</h3>
                <input
                    name={formDataName}
                    className={error ? "cpu-core-input-err": "cpu-core-input"}
                    type="Text"
                    onChange={(e) => handleChange(e)}
                ></input>
                <p className={ error ? "h3-P-err":""}>
                {error ? error: note}
                
               </p>
            </div>
        </div>
    )
}

export default Smallinputs



  