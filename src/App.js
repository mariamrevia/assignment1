
import React from "react"
import Home from "./home"
import Secondpage from "./secondpage"
import Thirdpage from "./Thirdpage"

import { Route, Routes,} from "react-router-dom"
import SuccessPage from "./SuccessPage"
import Laptoplists from "./Laptoplists"
import DetailedPage from "./DetailedPage"

function App() {

  return (

<Routes>
<Route index path="/" element= {<Home />} />
<Route exact path="/Secondpage" element={<Secondpage/>}/>
<Route exact path="/Thirdpage" element={<Thirdpage/>} />
<Route exact path="/SuccessPage" element={<SuccessPage/>} />
<Route exact path="/Laptoplists" element={<Laptoplists/>} />
<Route exact path="/DetailedPage/:id" element={<DetailedPage/>} />


</Routes>



  )

}

export default App;
