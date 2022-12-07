import React from "react"
import img2 from "./images/Picture2.png"
import img3 from "./images/Picture3.png"
import phonePic from "./images/PicturePhone2.png"
import "./home.css"
import { useNavigate } from "react-router-dom"



function Home() {
   const navigate = useNavigate();
   return (

      <div className="container">
         <div className="image">
            <img className="img2" src={img3} alt=""></img>
         </div>

         <div className="App">
            <picture className="picture">
               <source media="(max-width:600px)" srcSet={phonePic} alt="" ></source>
               <img className="img1" src={img2} alt=""/>
            </picture>
         </div>

         <div className="btn">
            <button type="button" onClick={() => navigate("/Secondpage")}>ჩანაწერის დამატება</button>
            <button type="button" onClick={() => navigate("/Laptoplists")} >ჩანაწერების სია</button>

         </div>
      </div>

   )
}

export default Home