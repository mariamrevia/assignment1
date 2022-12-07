import React, { useState, useEffect } from 'react'
import img7 from "./images/Picture7.png"
import "./Secondpage.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft,BsChevronDown, BsChevronUp} from "react-icons/all"


function Secondpage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    team_id: "",
    position_id: "",
  })

  const [isdivActive, setIsDivActive] = useState(false)
  const [isposdivActive, setIsPosDivActive] = useState(false)
  const [teams, setTeams] = useState([])
  const [positions, setPositions] = useState([])
  const [newposition, setNewPosition] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [teamSelected, setTeamSelected] = useState("");
  const [positionSelected, setPositionSelected] = useState("")
  // const [isActive , setIsActive]=useState(false)


  useEffect(() => {
    axios.get("https://pcfy.redberryinternship.ge/api/teams")
      .then(res => {
        setTeams(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  useEffect(() => {
    axios.get("https://pcfy.redberryinternship.ge/api/positions")
      .then(res => {
        setPositions(res.data.data)
      })
      .catch(err => {
        console.log(err)

      })
  }, [])


  useEffect(() => {
    const data = localStorage.getItem("formData")
    if (data) {

      setFormData(JSON.parse(data))
    }

  }, [])


  useEffect(() => {
    const team = localStorage.getItem("team")
    if (team) {
      setTeamSelected(JSON.parse(team))
    }
  }, [])



  useEffect(() => {
    const position = localStorage.getItem("position")
    if (position) {
      setPositionSelected(JSON.parse(position))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(teamSelected))
  }, [teamSelected])

  useEffect(() => {
    localStorage.setItem("position", JSON.stringify(positionSelected))
  }, [positionSelected])


  const handleChange = (event, id, teamName) => {
    event.preventDefault()


    const newteamdata = { ...formData, team_id: id }
    console.log(newteamdata)
    setTeamSelected(teamName)
    setIsDivActive(false)

    setFormData(newteamdata)
    localStorage.setItem("team", JSON.stringify(newteamdata))
    // const newid = parseInt(event.target.val)
    const ps = positions.filter(position => position.team_id === id)
    setNewPosition(ps)
  }





  const handlePosition = (event, positionId, positionName) => {
    event.preventDefault()
    const newPositiondata = { ...formData, position_id: positionId }
    localStorage.setItem("formData", JSON.stringify(newPositiondata))
    setPositionSelected(positionName)
    console.log(formData)
    setIsPosDivActive(false)
    setFormData(newPositiondata)
  }

  function handleformdata(event) {
    event.preventDefault()
    const { name, value } = event.target
    const newFormData = { ...formData, [name]: value }
    localStorage.setItem("formData", JSON.stringify(newFormData));

    setFormData(newFormData)

    console.log(formData)
  }
  const handlegoingBack = () => {
   
    navigate("/")
  }

  function handlesubmit(event) {
    event.preventDefault()

    const error = validate(formData)

    setFormErrors(error)
    setIsSubmit(true)

    console.log(formErrors)
    console.log(formErrors.name)
    console.log(formErrors.team_id)
    console.log(error)

    if (Object.keys(error).length !== 0) {
      return
    }
    navigate("/Thirdpage", {
      state: { formDatas: formData }
    })
  }

  const validate = (data) => {
    const errors = {}
    const regexalphabet = /^[ა-ჰ]+$/;
    const regexNumber = /^\+\995\d{9}?/g
    const regexEmail = /.*\@redberry.ge$/gm;
    console.log(errors)

    if (!data.name) {
      errors.name = "აუცილებელია შეავსოთ ველი"

    } else if (data.name.length < 2) {
      errors.name = "აუცილებელია მინიმუმ 2 სიმბოლო"

    } else if (!regexalphabet.test(data.name)) {
      errors.name = "გამოიყენეთ ქართული სიმბოლოები"
    }
    if (!data.surname) {
      errors.surname = "აუცილებელია შეავსოთ ველი"
    } else if (data.surname.length < 2) {
      errors.surname = "აუცილებელია მინიმუმ 2 სიმბოლო"
    } else if (!regexalphabet.test(data.surname)) {
      errors.surname = "გამოიყენეთ ქართული ასოები"
    }
    if (!data.email) {
      errors.email = "აუცილებელია შეავსოთ ველი"
    } else if (!regexEmail.test(data.email)) {
      errors.email = "გამოიყენეთ redberry.ge დაბოლოება"
    }
    if (!data.phone_number) {
      errors.phone_number = "აუცილებელია შეავსოთ ველი"
    } else if (!regexNumber.test(data.phone_number)) {
      errors.phone_number = "არ აკმაყოფილებს ქართული მობ-ნომრის ფორმატს"
    }
    if (!data.team_id) {
      errors.team_id = "error"

    }
    if (!data.position_id) {
      errors.position_id = "error"
    }

    return errors;
  }

// const mediaQuery =  window.matchMedia('(max-width: 400px)')

// const handleMedia = () => {
//   if(mediaQuery.matches) {
//     return <p className='page-number'>1/2</p>
//   }
// }
  return (

<div>
    <div className='section'>
    
      <div className='btn--section'>
        <div className='back-button-div'>
          <div
            className='back--button-2'
            onClick={handlegoingBack}
          ><BsChevronLeft className='back-icon' />
          </div>
        </div>

        <div className='headings'>
          <div className='btn-underline'>
            <button
              onClick={() => navigate("/Secondpage")}
              className="info--btn">თანამშრომლების ინფო</button>
              <div className= "underline"></div>
              
          </div>
          

          <button 
            onClick={() => navigate("/Thirdpage")}
            className='char--btn'>ლეპტოპის მახასიათებლები
          </button>
        </div>
      </div>
      <p className='page-number'>1/2</p>


      <form
        onSubmit={handlesubmit}
        className='form'>
        <div className='form--div'>
          <div className='firstandlastname'>

            <div className="firstnamediv">
              <div>
                <h3 className={formErrors.name ? "formerrors" : ""}>სახელი</h3>
                <input
                  className={formErrors.name ? "boxError" : "fninput--lninput"}
                  name="name"
                  onChange={handleformdata}
                  value={formData.name}

                ></input>
                {formErrors.name ?
                  <p className='formerrors'>{formErrors.name}</p> :
                  <p>მინიმუმ 2 სიმბოლო,ქართული ასოებით</p>}
              </div>
            </div>
            <div className='lastnamediv'>
              <div>
                <h3 className={formErrors.surname ? "formerrors" : ""}>გვარი</h3>
                <input
                  className={formErrors.surname ? "boxError" : "fninput--lninput"}
                  name="surname"
                  onChange={handleformdata}
                  value={formData.surname}


                ></input>
                {formErrors.surname ?
                  <p className="formerrors">{formErrors.surname}</p> :
                  <p>მინიმუმ 2 სიმბოლო,ქართული ასოებით</p>}

              </div>

            </div>
          </div>

          <div className='dropdown--div'>

            <div className={!formErrors.team_id ? "team-dpd" : "team-dpd-error"}>
              <div className='team-dpd-btn'
                name="team_id"
                onClick={(e) => {
                  setIsDivActive(!isdivActive)
                  
                }}
              >
                {teamSelected ? teamSelected : "გუნდი"}
                {!isdivActive ?
                 <BsChevronDown /> :
                  <BsChevronUp />}
              </div>
              {isdivActive && (
                <div className='team-dpd-content'>
                  {teams.map(((team) => {
                    return (
                      <div
                        className='option'
                        onClick={(event) => handleChange(event, team.id, team.name)}
                      >{team.name}</div>
                    )
                  }))}
                </div>
              )}
            </div>

            <div className='position-dpd'>
              <div className={!formErrors.position_id ? 'position-dpd' : "position-dpd--err"}>
                <div
                  className='position-dpd-btn'
                  name="position_id"
                  onClick={
                    (e) => {
                      setIsPosDivActive(!isposdivActive)
                    }}
                >
                  {positionSelected ? positionSelected : "პოზიცია"}
                  {!isposdivActive? <BsChevronDown /> :
                  <BsChevronUp />}
                </div>

                {isposdivActive && (
                  <div className='position-dpd-content'>
                    {newposition.map(((position) => {
                      return (
                        <div
                          className='option'
                          onClick={(event) => handlePosition(event, position.id, position.name)}
                        >{position.name}</div>
                      )
                    }))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='mail--div'>
            <h3 className={formErrors.email ? "formerrors" : "mail--header"}>მაილი</h3>
            <input

              className={formErrors.email ? "mail-num-input-error" : "mail-num-input"}

              name="email"
              onChange={handleformdata}
              value={formData.email}

            ></input>
            {formErrors.email ?
              <p className="formerrors">{formErrors.email}</p> :
              <p>უმდა მთავრდებოდეს redberry.ge-თი</p>}

          </div>
          <div className='number--div'>
            <h3 className={formErrors.phone_number ? "formerrors" : "phone--number"}>ტელეფონის ნომერი</h3>
            <input
              className={formErrors.phone_number ? "mail-num-input-error " : "mail-num-input"}
              name="phone_number"
              onChange={handleformdata}
              value={formData.phone_number}
            ></input>
            {formErrors.phone_number ?
              <p className='formerrors'>{formErrors.phone_number}</p> :
              <p>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</p>}

          </div>

          <div className='next--btn-div'>
            <button
              className='next--btn'
              type="submit">შემდეგი</button>
          </div>
        </div>

      </form>
      <div className='img7--div'>
        <img src={img7} className="img7"></img>
      </div>

    </div>
    </div>
  )

}

export default Secondpage

