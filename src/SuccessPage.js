import React from 'react';
import "./success.css";
import img4 from "./images/Picture1.png"
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate()
  return (
    <div className='success-section'>
      <div className='success-div'>
        <img src={img4} alt="" className='successimg'></img>
        <div className='success-note'>
          ჩანაწერი დამატებულია!
        </div>
        
     
        <div className='success-button-div'>
      <button className='lists--btn' onClick={() => navigate("/Laptoplists")}>ჩანაწერების სია</button>
      <button className='main--btn' type='button' onClick={() => navigate("/")}>მთავარი</button>
      </div>
        
      </div>
     
    </div>
  )
}

export default SuccessPage