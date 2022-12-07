import React, { useEffect } from 'react'
import "./thirdpage.css"
import { BsChevronDown, BsChevronUp, BsFillExclamationTriangleFill, BsChevronLeft } from "react-icons/all"
import { AiOutlineCheck, BsFillCameraFill } from "react-icons/all"
import { useState } from "react"
import Inputs from './components/inputs'
import Radiobotton from "./components/Radiobotton"
import Smallinputs from './components/smallinputs'
import { useNavigate, useLocation } from 'react-router-dom'
import img7 from "./images/Picture7.png"

import Media from "react-media"

function Thirdpage() {

  const navigate = useNavigate()
  const location = useLocation()
  const { formDatas } = location.state

  const [isActive, setIsActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [iscpuactive, setIsCpuActiv] = useState(false)
  const [isselected, setIsSelected] = useState("")
  const [selected, setSelected] = useState("")
  const [laptopBrands, setLaptopBrands] = useState([])
  const [cpus, setCpus] = useState([])
  const [formErrors, setFormErrors] = useState([])
  const [formData, setFormData] = useState({
    name: formDatas.name,
    surname: formDatas.surname,
    email: formDatas.email,
    phone_number: formDatas.phone_number,
    team_id: formDatas.team_id,
    position_id: formDatas.position_id,
    laptop_name: "",
    laptop_image: "",
    laptop_brand_id: "",
    laptop_cpu: "",
    laptop_cpu_cores: "",
    laptop_cpu_threads: "",
    laptop_ram: "",
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: "",
    token: "9b44ef138145cd90a69673b9dd6abd44",
  })



  const fetchbrand = () => {
    fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((res) => res.json())
      .then((data) => setLaptopBrands(data.data))
  }
  const fetchCPU = () => {
    fetch("https://pcfy.redberryinternship.ge/api/cpus")
      .then((res) => res.json())
      .then((data) => setCpus(data.data))

  }

  useEffect(() => {
    fetchbrand();

    fetchCPU();
  }, [])

  // ---------------- dropDown div localStorage----------------
  useEffect(() => {
    const laptopBrands = localStorage.getItem("brand")
    if (laptopBrands) {
      setSelected(JSON.parse(laptopBrands))
    }
  }, [])

  useEffect(() => {
    const laptopCPU = localStorage.getItem("CPU")
    if (laptopCPU) {
      setIsSelected(JSON.parse(laptopCPU))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("brand", JSON.stringify(selected))
  }, [selected])

  useEffect(() => {
    localStorage.setItem("CPU", JSON.stringify(isselected))
  }, [isselected])

  // ---------------------------//


  // useEffect(() => {
  //   const data = localStorage.getItem("formData")
  //   if (data) {
  //     setFormData(JSON.parse(data))
  //   }
  // }, [])

  // useEffect (() => {
  //   const formdata = localStorage.getItem ("newData")
  //   if(formdata) {
  //    setFormData(JSON.parse(formdata))
  //   }
  // },[])

  // useEffect (() => {
  //   localStorage.setItem("formdata", JSON.stringify(formData))
  // },[])



  const handleClick = (name, id) => {
    setSelected(name)
    setIsActive(false)
    setFormData((prevValue) => {
      return (
        {
          ...prevValue,
          laptop_brand_id: id
        }
      )
    })
    console.log(name)
    console.log(formData)

  }

  const handleClick2 = (name, id) => {
    setIsSelected(name)
    setIsCpuActiv(false)
    setFormData((prevValue) => {
      return (
        {
          ...prevValue,
          laptop_cpu: name,
        }
      )
    })
  }

  const handlebotton = (e) => {

    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    localStorage.setItem("formData", JSON.stringify(newFormData))
    setFormData(newFormData)
    console.log(formData)

  }


  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    localStorage.setItem("formData", JSON.stringify(formData))
    console.log(formData)

  }


  const handleimage = (e) => {


    setFormData((prevValue) => {
      return {
        ...prevValue,
        laptop_image: e.target.files[0]
      }
    })

    setSelectedImage(URL.createObjectURL(e.target.files[0]))
    console.log(selectedImage)



  }
  const handlegoingBack = () => {

    navigate("/")
  }
  function handleSubmit(event) {
    event.preventDefault()

    const Data = new FormData()
    for (let item in formData) {
      Data.append(item, formData[item])
    }

    console.log(Array.from(Data))


    const errors = validate(formData)
    fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
      method: "POST",
      // headers: {'Content-Type': 'application/json'},
      body: Data

    })
      .then((res) => res.json())
      .then((data) => console.log(data, "jjj"))
      .catch((error) => console.log(error))

    setFormErrors(errors)
    console.log(formErrors)
    if (Object.keys(errors).length !== 0) {
      return
    }
    navigate("/SuccessPage")
  }


  const validate = (data) => {
    const errors = {}
    const regexalphabet = /[a-zA-Z\s.,]+$/
    const regexNumber = /[0-9]$/
    console.log(errors)

    if (!data.laptop_image) {
      errors.laptop_image = "errors"
    }
    if (!data.laptop_name) {
      errors.laptop_name = "გთხოვთ შეავსოთ ველი"
    } else if (!regexalphabet.test(data.laptop_name)) {
      errors.laptop_name = "შეგიძლია გამოიყენო ლათინური ასოები, ციფრები, !@#$%^&*()_+"
    }
    if (!data.laptop_cpu_cores) {
      errors.laptop_cpu_cores = "გთხოვთ შეავსოთ ველი"
    } else if (!regexNumber.test(data.laptop_cpu_cores)) {
      errors.laptop_cpu_cores = "გთხოვთ მიუთითთ ციფრებით"
    }


    if (!data.laptop_cpu_threads) {
      errors.laptop_cpu_threads = "გთხოვთ შეავსოთ ველი"
    }
    else if (!regexNumber.test(data.laptop_cpu_threads)) {
      errors.laptop_cpu_threads = "გთხოვთ მიუთითთ ციფრებით"
    }


    if (!data.laptop_cpu) {
      errors.laptop_cpu = "error"
    }
    if (!data.laptop_brand_id) {
      errors.laptop_brand_id = "error"
    }


    if (!data.laptop_ram) {
      errors.laptop_ram = "გთხოვთ შეავსოთ ველი"
    }
    else if (!regexNumber.test(data.laptop_ram)) {
      errors.laptop_ram = "გთხოვთ მიუთითთ ციფრებით"
    }


    if (!data.laptop_hard_drive_type) {
      errors.laptop_hard_drive_type = "error"
    }
    if (!data.laptop_state) {
      errors.laptop_state = "error"
    }
    if (!data.laptop_purchase_date) {
      errors.laptop_purchase_date = "error"
    }
    if (!data.laptop_price) {
      errors.laptop_price = "გთხოვთ შეავსოთ ველი"
    } else if (!regexNumber.test(data.laptop_price)) {
      errors.laptop_price = "მხოლოდ ციფრები"
    }

    return errors
  }



  let cond1 = selectedImage ? " image--div--" : 'image--div'
  let cond2 = selectedImage ? "imagenone" : 'imagenote'
  let cond3 = formErrors.laptop_image ? "imageNoteErr" : "h2"
  let cond4 = formErrors.laptop_image ? "imageNoteDivErr" : "imagenote"
  let cond5 = formErrors.laptop_image ? "imageError" : "image--div"



  //   const mediaQuery = window.matchMedia('(max-width: 600px)');
  //   const handledePhoto = () => {
  //     if (mediaQuery.matches) {
  //       return <img style={{ height: 244, width: 358, borderRadius: 8, objectFit: "cover" }} src={selectedImage} alt="" />
  //     } else if (mediaQuery.matches !== mediaQuery) {
  //       return <div>{selectedImage ? <div>
  //             <picture>
  //             <source media="(max-width:600px)"  srcSet={selectedImage} alt=""></source>
  //         <img style={{ height: 423, width: 876, borderRadius: 8, objectFit: "cover" }} src={selectedImage} alt="" />
  //         </picture>

  // </div> : ""}</div>

  //     }

  //     }




  return (

    <div className='section' >

      <div className='btn--section'>
        <div className='back-button-div'>
          <div
            className='back--button-2'
            onClick={handlegoingBack}
          ><BsChevronLeft className='back-icon' /></div>

        </div>
        <div className='headings'>
          <div className='btn-underline1'>
            <button
              onClick={() => navigate("/Secondpage")}
              className="info--btn1">თანამშრომლების ინფო</button>


          </div>
          <div className='btn-underline1'>
            <button
              onClick={() => navigate("/Thirdpage")}
              className='char--btn1'>ლეპტოპის მახასიათებლები</button>
            <div className="underline1"></div>
          </div>
        </div>
      </div>
      <p className='page-number'>2/2</p>


      <form
        onSubmit={handleSubmit}
        className={selectedImage ? "form1 " : 'thirdpage--form'}>


        {/* ----------- image ------------- */}

        <div className={`${cond5} ${cond1} `}>
          {/* {handledePhoto()} */}

          {selectedImage ? <div>
            <picture className='imglaptop'>
              <source media="(max-width:600px)" srcSet={selectedImage} alt=""></source>
              <img src={selectedImage} alt="" />
            </picture>

          </div> : ""}


          <div className={selectedImage ? "btn--success--div " : 'btn--note--div'}>
            <div className={selectedImage && formErrors.laptop_image ? "iconNoteDiverr" : "iconNoteDiv"}>
              {
                formErrors.laptop_image ?
                  <BsFillExclamationTriangleFill
                    className='iconerr'
                  /> : ""

              }

              <Media query="(min-width:600px)">{
                (matches) => {
                  return matches ? "" : <BsFillCameraFill
                    className="camerIcon" />
                }
              }


              </Media>
              <div className={`${cond2} ${cond4}`}>
                <Media query="(min-width:600px)">

                  {(matches) => {
                    return matches ?
                      <h2 className={`${cond3}`}>
                        ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                      </h2> :

                      <label className='media-image--Btn'>
                        <input

                          className='image--input1'
                          type="file"
                          name="laptop_image"
                          multiple accept='image/png, image/jpeg , image/webp'
                          onChange={handleimage}
                        >
                        </input>
                        {selectedImage ? "თავიდან ატვირთე" : "ლეპტოპის ფოტოს ატვირთვა"}
                      </label>

                  }}

                </Media>

              </div>

              {formErrors.laptop_image ? <BsFillExclamationTriangleFill
                className='iconerr1'
              /> : ""}
            </div>

            {selectedImage ?
              <div style={{ height: 30, width: 400, display: 'flex', alignItems: 'center' }}>
                <div className='circle'>
                  <AiOutlineCheck />
                </div>
                <span>{formData.laptop_image.name}</span>
              </div> : ""

            }
            <label className={selectedImage ? "again--input" : 'image--label'}>
              <input
                className='image--input'
                type="file"
                name="laptop_image"
                multiple accept='image/png, image/jpeg , image/webp'
                onChange={handleimage}
              >
              </input>
              {selectedImage ? "თავიდან ატვირთე" : "ატვირთე"}
            </label>
          </div>
        </div>
        {/* ----------- image ------------- */}

        {/* --------------------------------------- */}

        <div className={selectedImage ? "div" : "div--"}>
          <div className={selectedImage ? 'laptop--NB2' : 'laptop--NB'}>
            <Inputs
              placeholder="HP"
              error={formErrors.laptop_name}
              name="ლეპტოპის სახელი"
              note="ლათინური ასოები, ციფრები, !@#$%^&*()_+="
              formData={formData}
              handleChange={handleChange}
              formDataName="laptop_name"
            />
            <div className={formErrors.laptop_brand_id ? "dropdown--err" : 'dropdown'}>
              <div
                className='dropdown--btn'
                name="laptop_brand_id"
                onClick={
                  (e) => {
                    setIsActive(!isActive)
                  }
                }
              >
                {selected ?
                  selected : "ლეპტოპის ბრენდი"
                }
                {!isActive ?
                  <BsChevronDown /> :
                  <BsChevronUp />}
              </div>
              {isActive && (
                <div className='dropdown--content'>
                  {laptopBrands.map((laptopbrand =>
                    <div
                      key={laptopbrand.id}
                      value={formData.laptop_brand_id}
                      onClick={() =>
                        handleClick(laptopbrand.name, laptopbrand.id)
                      }
                      className='dropdown--item'>{laptopbrand.name}</div>
                  ))
                  }
                </div>
              )}
            </div>
          </div>
          <hr className='hr-1'></hr>
          <div className='CPU--div'>
            <div className={formErrors.laptop_cpu ? "dropdown--cpu--err" : "dropdown--cpu"}>
              <div className='dropdown--btn--cpu'
                name="laptop_cpu"
                onClick={
                  (e) => {
                    setIsCpuActiv(!iscpuactive)
                  }}
              >
                {isselected ?
                  isselected : "CPU"
                }
                {
                  !iscpuactive ?
                    <BsChevronDown /> :
                    <BsChevronUp />
                }
              </div>

              {iscpuactive && (
                <div className='dropdown--content--cpu'>
                  {cpus.map((Cpu =>
                    <div
                      key={Cpu.id}
                      onClick={
                        () => handleClick2(Cpu.name, Cpu.id)
                      }
                      className='dropdown--item--cpu'>{Cpu.name}</div>
                  ))
                  }
                </div>
              )}
            </div>
            <Smallinputs
              placeholder="14"
              name="CPU-ს ბირთვი"
              note="მხოლოდ ციფრები"
              formDataName="laptop_cpu_cores"
              handleChange={handleChange}
              error={formErrors.laptop_cpu_cores}

            />
            <Smallinputs
              placeholder="364"
              name="CPU-ს ნაკადი"
              note="მხოლოდ ციფრები"
              formDataName="laptop_cpu_threads"
              handleChange={handleChange}
              error={formErrors.laptop_cpu_threads}
            />

          </div>
          <div className='third--section'>
            <Inputs
              placeholder="16"
              name="ლეპტოპის RAM"
              note="მხოლოდ ციფრები"
              handleChange={handleChange}
              formDataName="laptop_ram"
              error={formErrors.laptop_ram}

            />
            <Radiobotton
              name="მეხსიერების ტიპი"
              label1="SSD"
              label2="HDD"
              formDataName="laptop_hard_drive_type"
              handlebotton={handlebotton}
              value1="SSD"
              value2="HDD"
              ckecked1={formData.laptop_hard_drive_type === "SSD"}
              checked2={formData.laptop_hard_drive_type === "HDD"}
              error={formErrors.laptop_hard_drive_type}
            />
          </div>
          <hr className='hr-2'></hr>
          <div className='price--date--div'>
            <div style={{ "height": 134 }}>
              <h3 className={formErrors.laptop_purchase_date ? "h3-P-err" : ""}>შეძენის რიცხვი (არჩევითი)</h3>
              <input
                type="text"
                name="laptop_purchase_date"
                className={formErrors.laptop_purchase_date ? "date--input--err" : "date--input"}
                placeholder="dd/mm/yyyy"
                onChange={handleChange}
              ></input>

            </div>
            <Inputs
              placeholder="0000 ₾"
              name="ლეპტოპის ფასი"
              note="მხოლოდ ციფრები"
              handleChange={handleChange}
              formDataName="laptop_price"
              error={formErrors.laptop_price}

            />
          </div>
          <div className='radiobottom--div'>
            <Radiobotton
              name="ლეპტოპის მდგომარეობა"
              label1="ახალი"
              label2="მეორადი"
              formDataName="laptop_state"
              handlebotton={handlebotton}
              value1="new"
              value2="used"
              ckecked1={formData.laptop_state === "new"}
              checked2={formData.laptop_state === "used"}
              error={formErrors.laptop_state}
            />
          </div>
          <div className="btn--div">
            <button className='back--btn'>უკან</button>
            <button className='save--btn'
            >დამახსოვრება</button>
          </div>
        </div>


      </form >
      <div className='img7--div'>
        <img src={img7} className="img7"></img>
      </div>
    </div >
  )
}

export default Thirdpage