import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Link } from "react-router-dom";

import { userData } from "../../helpers";

const Custom= ({isLoogedIn, username }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loginLogout = isLoogedIn ? (
    <NavLink tag={Link} to="/logout">
      Cerrar sesion
    </NavLink>
  ) : (
    <NavLink tag={Link} to="/login">
      Iniciar sesion
    </NavLink>
  );

  return (
    <div className="custom-nav">
      <Navbar color="light" light expand="md" container>
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          Nombre de la pagina
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              {isLoogedIn ? (
                <>
                  <DropdownToggle nav caret>
                    Bienvenido {username} 
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <NavLink tag={Link} to="/materia">
                        Crud Materias
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={Link} to="/estudiantes">
                        Crud Estudiantes
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={Link} to="/matricula">
                        Crud Matricula
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{loginLogout}</DropdownItem>
                  </DropdownMenu>
                </>
              ) : (
                loginLogout
              )}
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Custom;
