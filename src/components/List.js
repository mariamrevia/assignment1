// import React,{useEffect,useState} from "react";
import "./List.css"
import { useNavigate } from 'react-router-dom'
import React from "react";
import { CgOverflow } from "react-icons/cg";


function List({
  image,
  laptopname,
  name,
  surname,
  id

}) {

  const navigate = useNavigate();
  function handleClick() {
    const id1 = id
    console.log(id1)
    navigate("/DetailedPage/" + id1)
  }
  let mediaQuery  = window.matchMedia('(max-width: 600px)');
  const handlemediaImage = () =>{
    if (mediaQuery.matches ) {
      return <img className="listPage--img " src={`https://pcfy.redberryinternship.ge/${image}`} alt="" />
    }
  }



  return (
    <div className='listbox--div'>
         
       
        {
         handlemediaImage () ? handlemediaImage () : <img  className="listPage--img " src={`https://pcfy.redberryinternship.ge/${image}`} alt="" />
        }
        <div className='characteristics'>
          <h3 className="NameSurname" >{name} {surname}</h3>
          <h4 className="LaptopName">{laptopname}</h4>
          <button type="button" className='moreinfo--btn' onClick={() => handleClick()} id={id} >მეტის ნახვა</button>
        </div>
     
    </div>
  )
}

export default List