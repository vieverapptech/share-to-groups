import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import ViewStudents from "./viewstudents";
import AdmitStudent  from "./admitstudent";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      
        <Route path="views" element={<ViewStudents />} />
        <Route path="admits" element={<AdmitStudent />} />
         </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);