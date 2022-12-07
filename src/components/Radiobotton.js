import React from 'react'
import {BsFillExclamationTriangleFill} from "react-icons/bs"

const Radiobotton = ({
  name,
  formDataName,
  label1,
  label2,
  handlebotton,
  value1,
  value2,
  checked1,
  checked2 ,
  error 
}) => {
  return (
    <div className='memory-type-div'>
      <h3 >
      {error ? <div className='iconh3--div'><span className={error?"memmoryh3":"" }>{name}</span> <BsFillExclamationTriangleFill
        className='memmoryerricon '
      /></div>

      :name
      }
      
      </h3>
      <label className='radio'>
        <input
          type="radio"
          name={formDataName}
          className='radio--input'
          onChange={(e) => handlebotton(e)}
          value={value1}
          checked={checked1}
        >
        </input>
        <div className='radio--radio'>
        </div>
        {label1}
      </label>
      <label className='radio1' >
        <input
          type="radio"
          name={formDataName}
          className='radio--input'
          onChange={(e) => handlebotton(e)}
          value={value2}
          checked={checked2}
        ></input>
        <div className='radio--radio'>
        </div>
        {label2}
      </label>
    </div>
  )
}

export default Radiobotton