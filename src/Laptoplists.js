import React, { useEffect, useState } from 'react'
import List from './components/List'
import "./ListPage.css"
import {BsChevronLeft} from "react-icons/all"
import {useNavigate}  from "react-router-dom"



function Laptoplists() {


  const navigate = useNavigate ()
  const [datalist, setDataList] = useState([])

  const fetchlists = () => {
    fetch("https://pcfy.redberryinternship.ge/api/laptops?token=9b44ef138145cd90a69673b9dd6abd44")
      .then((res) => res.json())
      .then((data) =>  setDataList(data.data))
  }

  useEffect(() => {
    fetchlists()
  }, [])
  const handlegoingBack = () =>{
     navigate ("/")
     localStorage.clear()
  }



  return (

    <div className='listPage--div'>
   
    <div className='lapList-page-div'>
    <div 
    className='back--button'
    onClick={handlegoingBack}
    ><BsChevronLeft className='back-icon'/></div>
    <h2 className="lapList-page-header">ჩანაწერების სია</h2>
    </div>
    <div className='list--div'>
    
      {

        datalist.map((item) => {
         
          return (
             <List 
            key={item.laptop.id}
            image = {item.laptop.image}
            laptopname = {item.laptop.name}
            name = {item.user.name}
            surname={item.user.surname}
            id={item.laptop.id}
            />
          )
        })
      }
      
      </div>
    </div>


  )
}


export default Laptoplists