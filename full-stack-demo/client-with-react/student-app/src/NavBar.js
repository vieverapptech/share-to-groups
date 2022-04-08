import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/view">View Students</Link>
    </li>
    <li>
      <Link to="/admit">Admit Student</Link>
    </li>
    <li>
      <Link to="/award">Award Student</Link>
    </li>
  </div>
  );
}
export default navbar;