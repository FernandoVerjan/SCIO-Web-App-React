import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';



interface tableProps{
    onClose: Function;
    selectCourse: Function;
    cursos: any[];  
}

export default function Table(tableProps: tableProps) {

  return (
    <div className="App text-center">
      
      <h2>Cursos</h2>
      <br />
      <button className="btn btn-success" onClick={() => tableProps.onClose()}>
        Agregar
      </button>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Creditos</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tableProps.cursos.map((curso:any) => (
            <tr key={curso._id}>
              <td>
                <Link to={`/details/${curso._id}`}>{curso.nombre}</Link>
                </td>
              <td>{curso.creditos}</td>
              <td>{curso.descripcion}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => tableProps.selectCourse(curso, "Editar")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => tableProps.selectCourse(curso, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  )
}