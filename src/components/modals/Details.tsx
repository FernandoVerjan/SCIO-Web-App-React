import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

export default function Details() {
    
    const baseUrl = "http://localhost:3000/cursos/";
    const [curso, setCurso] = useState<any>([])
    const params = useParams();
    
    const peticionGetById = async () => {
        await axios.get(baseUrl + params.id)
        .then((response) => {
          setCurso(response.data.cursos);
        });
      };

    useEffect(() => {
    const fetchData = async () => {
      await peticionGetById();
    };
    fetchData();
  }, []);
    
  return (
      <>
      <h2 className="text-center mb-5 mt-4">{curso.nombre}</h2>
      <div className='container'>
    <ul>
        <li><b className='fw-bold'>Creditos del curso: </b>{curso.creditos} </li> 
        <li><b className='fw-bold'>Descripción: </b> {curso.descripcion}</li>
        <li><b className='fw-bold'>Número de alumnos: </b> {curso.noAlumnos}</li>           
    </ul>
    </div>
    </>
  )
}