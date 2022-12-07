
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Detaildpage.css"
import {BsChevronLeft} from "react-icons/all"
import {useNavigate}  from "react-router-dom"





function DetailedPage() {
  const navigate = useNavigate ()
  const { id } = useParams()


  // const [newinfo , setNewInfo]=useState ([])

  const [info, setInfo] = useState([])
  const [brandname, setBrandsName] = useState([])
  const [TeamName, setTeamName] = useState([])
  const [positionname, setPositionName] = useState([])
  // const [team, setTeam] =useState([])

  const fetchinfo = () => {
    fetch(`https://pcfy.redberryinternship.ge/api/laptop/+${id}?token=9b44ef138145cd90a69673b9dd6abd44`)
      .then((res) => res.json())
      .then((data) => setInfo(data.data))
  }
  const fetchbrand = () => {
    fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((data) => setBrandsName(data.data))
  }
  const fetchTeams = () => {
    fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((res) => res.json())
      .then((data) => setTeamName(data.data))
  }
  const fetchposition = () => {
    fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((res) => res.json())
      .then((data) => setPositionName(data.data))
  }
  console.log(info)
  useEffect(() => {
    fetchinfo()
    fetchbrand()
    fetchTeams()
    fetchposition()
  }, [])

  // const result = Object.entries(info)
  // console.log(result)
  // const newResult =  result.map ((item) => {
  //   const[first , second] = item
  //   console.log (first ,second )
  //   return second

  //  })
  //  console.log (newResult)

  const { laptop, user } = info

  const PositionId = user && user.position_id
  const teamId = user && user.team_id
  const brandId = laptop && laptop.brand_id
  const State = laptop && laptop.state



  const positionName = positionname.find((item) => item.id === PositionId)

  const Teamname = () => {
    for (let i = 0; i < TeamName.length; i++) {
      if (TeamName[i].id === teamId) {
        return (
          <li>{TeamName[i].name}</li>
        )
      }
    }

  }
  const brandsName = () => {
    for (let i = 0; i < brandname.length; i++) {
      if (brandname[i].id === brandId) {
        return (
          <li>{brandname[i].name}</li>
        )
      }
    }

  }

  const state = () => {
    if (State === "new") {
      return <li>ახალი</li>
    } else if (State === "used") {
      return <li>მეორადი</li>
    }
  }

  const mediaQuery = window.matchMedia('(max-width: 600px)');
  const handledetailedImage = () => {
    if (mediaQuery.matches) {
      return <img className="detailedImage " src={laptop && `https://pcfy.redberryinternship.ge/${laptop.image}`}></img>
    }
  }
  const handlegoingBack = () =>{
    navigate ("/")
    localStorage.clear()
 }








  return (

    <div className="main--section">
      <div className='lapList-page-div'>
    <div 
    className='back--button'
    onClick={handlegoingBack}
    ><BsChevronLeft className='back-icon'/></div>
    <h2 className="lapList-page-header">ლეპტოპის ინფო</h2>
    </div>


      <div className="section1">
        <div classname="image-section1">
          {
            handledetailedImage() ? handledetailedImage() :
              <img className="detailedImage " src={laptop && `https://pcfy.redberryinternship.ge/${laptop.image}`}></img>

          }
        </div>



        <div className="info-section1">
          <ul className="list-section1">
            <li>სახელი:</li>
            <li>თიმი:</li>
            <li>პოზიცია:</li>
            <li>მეილი:</li>
            <li>ტელ.ნომერი:</li>
          </ul>
          <div>
            <div className="value--section1">
              <ul className="value-list-section1">
                <li>{user && user.name} {laptop && user.surname}</li>
                {Teamname()}
                <li>{positionName && positionName.name}</li>
                <li>{user && user.email}</li>
                <li>{user && user.phone_number}</li>
              </ul>
            </div>
          </div>
        </div>


      </div>
      <hr className="list--hr1"></hr>
      <div className="section2">
        <div className="list-section2--div">
          <div>
            <ul className="list-section2">
              <li>ლეპტოპის სახელი:</li>
              <li>ლეპტოპის ბრენდი:</li>
              <li>RAM:</li>
              <li>მეხსიერების ტიპი:</li>
            </ul>
          </div>
          <div className="value--section2" >
            <ul className="value-list-section2">
              <li>{laptop && laptop.name} </li>
              {brandsName()}
              <li>{laptop && laptop.ram}</li>
              <li>{laptop && laptop.hard_drive_type}</li>
            </ul>

          </div>
        </div>
        <div className="value--section2--div">
          <div className="value-list-div">
            <ul className="list-section2">
              <li>CPU:</li>
              <li>CPU-ს ბირთვი:</li>
              <li>CPU-ს ნაკადი:</li>
            </ul>
          </div>
          <div className="value-list-section2-div">
            <ul className="value-list-section2">
              <li>{laptop && laptop.cpu.name} </li>
              <li>{laptop && laptop.cpu.cores}</li>
              <li>{laptop && laptop.cpu.threads}</li>
            </ul>

          </div>
        </div>
      </div>
      <hr className="list--hr2"></hr>
      <div className="section3">
        <div className="list-section3--div">
          <div>
            <ul className="list-section3">
             <li>მდგომარეობა:</li>
                <li>ლეპტოპის ფასი:</li>
            </ul>
          </div>
          <div className="value-section2--div" >
            <ul className="value-list-section2">
              {state()}
              <li>{laptop && laptop.price}</li>
            </ul>

          </div>
        </div>
        <div className="value-section3-div">
          <div classname="value-section3--div">
            <ul className="last-list-section">
              <li>შეძენის რიცხვი:</li>
            </ul>
          </div>
          <div  classname="last-list-section-div">
            <ul className="value-list-section3">
              <li>{laptop && laptop.purchase_date}</li>
            </ul>
          </div>
        </div>
      </div>







    </div>
  )
}
export default DetailedPage