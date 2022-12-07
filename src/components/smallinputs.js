import React from 'react'

function Smallinputs({ name, note, handleChange, formDataName, error, placeholder }) {
    return (
        <div>
            <div className='cpu-core'>
                <h3 className={error ? "h3-P-err" : ""}>{name}</h3>
                <input
                    placeholder={placeholder}
                    name={formDataName}
                    className={error ? "cpu-core-input-err" : "cpu-core-input"}
                    type="Text"
                    onChange={(e) => handleChange(e)}
                ></input>
                <p className={error ? "h3-P-err" : ""}>
                    {error ? error : note}

                </p>
            </div>
        </div>
    )
}

export default Smallinputs



