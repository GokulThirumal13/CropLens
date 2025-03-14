import React from 'react'
// import ImageUploadForm from './imageupload'
import { Route,Routes } from "react-router-dom";
import App from './Home';
import Login from './Authpage';
import DiagnosisPage from './Diagnosis';
import ReportsPage from './ReportPages';
import Model from './premium';
import AddDiseaseForm from './AddDiseaseForm';
import Blogcontent from './blogcontent';
import Feed from './Feed';
import Company from './Company';
import Welcome from './Welcome';
import Treatment from './Treatment';

function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Welcome/>}></Route>
        <Route path='/app' element={<App/>}>
        </Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path="/page" element={<DiagnosisPage/>}></Route>
        <Route path="/report" element={<ReportsPage/>}></Route>
        <Route path="/premium" element={<Model/>}></Route>
        <Route path='/addnew' element={<AddDiseaseForm/>}></Route>
        <Route path='/blog'  element={<Blogcontent/>}></Route>
        <Route path='/feed' element={<Feed/>}></Route>
        <Route path='/company' element={<Company/>}></Route>
        <Route path='/treatment' element={<Treatment/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
    </Routes>
  )
} 

export default Routers