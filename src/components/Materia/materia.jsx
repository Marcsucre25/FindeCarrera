import React from "react";
import { Button, Col, Row, Table } from "reactstrap";
import useMaterias from "./useMaterias";
import { Link } from "react-router-dom";

const Materia = ({ eliminarMateria, index, productId, basketItemId }) => {
  const { matriculas, materias } = useMaterias();
  //console.log(matriculas);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}> Lista de materias</h2>

      {matriculas.length
        ? matriculas.map((matricula) => {
            //Primero ver si tiene productos
            const hasMaterias = materias.filter(
              (materia) =>
                materia.attributes.matriculas.data.id === matriculas.id
            );

            return hasMaterias && hasMaterias.length ? (
              <>
                <Row key={matricula.id} className="category">
                  {hasMaterias.map((materia) => (
                    <Col sm="12" md="4" key={materia.id}>
                      <Table>
                        <thead>
                          <tr>
                            <th>id de matricula</th>
                            <th>Nombre</th>
                            <th>codigo</th>
                            <th>Creditos</th>
                            <th>Funciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{materia.id}</th>
                            <td>{materia.attributes.nombre}</td>
                            <td>{materia.attributes.codigo}</td>
                            <td>{materia.attributes.creditos}</td>
                            <td>
                              <Button
                                color="danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  eliminarMateria({
                                    basketItemId,
                                    productId,
                                    index,
                                  });
                                }}
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  ))}
                </Row>
              </>
            ) : null;
          })
        : null}
    </div>
  );
};
export default Materia;
