// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import axios from 'axios';
import Registration from './component/Register';
import Login from './component/login';
// import Welcome from './component/welcome';
import Logout from './component/logout';
import QuotesComponent from './component/quotes';

function App() {
  // const [message,setMessage]=useState('');
   // Hook to get the current path

  

  return (
    <div>
    <Router>
      <Routes>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* <Route path='/welcome' element={<Welcome/>}/> */}
        <Route path='/logout' element={<Logout/>}/>
        <Route path="/quotes" element={<QuotesComponent/>} />
        <Route path="/" element={<Registration/>}/>
      </Routes>
    </Router>
  </div>
);
}

export default App;
