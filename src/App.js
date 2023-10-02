import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Custom from "./components/custonNav/custom";
import { Protector, userData } from "./helpers";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/home";
import Login from "./components/login/login";
import Logout from "./components/logout/logout";
import Materia from "./components/Materia/materia";
import Matricula from "./components/Matricula/matricula";
import Student from "./components/Estudiantes/student";
import useMaterias from "./components/Materia/useMaterias";

function App() {
  const { jwt, username } = userData();
  const isLoogedIn = !!jwt;
  const { eliminarMateria, basket } = useMaterias(jwt);

  return (
    <React.Fragment>
      <Router>
        <Custom isLoogedIn={isLoogedIn} username={username} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/materia" element={<Materia eliminarMateria={eliminarMateria} basket={basket} />}></Route>
          <Route path="/matricula" element={<Matricula />}></Route>
          <Route path="/estudiantes" element={<Student />}></Route>
        </Routes>
        <ToastContainer />
      </Router>
    </React.Fragment>
  );
}

export default App;
