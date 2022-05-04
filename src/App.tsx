import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import ModalDialog from "./components/modals/Dialog";
import ModalAlert from "./components/modals/Alert";
import courseModel from "./models/courseModel";
import Table from "./components/modals/Table";
import Details from "./components/modals/Details";


const baseUrl = "http://localhost:3000/cursos/";


function App() {

  const defCourse = {
    nombre: "",
    descripcion: "",
  }

  const [cursos, setCursos] = useState<any[]>([])
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<courseModel>(defCourse);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setCursoSeleccionado((prevState:any) => ({
      ...prevState,
      [name]: value,
      
    }));  
    console.log(cursoSeleccionado)
  };

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setCursos(response.data.cursos);
      console.log(response.data.cursos)
      
    });
  };

  const peticionGetById = async () => {
    await axios.get(baseUrl + cursoSeleccionado._id).then((response) => {
      setCursos(response.data.cursos);
    });
  };
  
  const peticionPost = async () => {
    await axios.post(baseUrl, cursoSeleccionado).then((response) => {
      setCursos(cursos.concat(response.data.curso));

      abrirCerrarModalInstertar();
    });
  };

  const peticionDelete = async () => {
    await axios.delete(baseUrl + cursoSeleccionado._id).then((response) => {
      setCursos(cursos.filter((curso) => curso._id !== cursoSeleccionado._id));
      abrirCerrarModalEliminar();
    });
  };

  const peticionPatch = async () => {
    await axios
      .patch(baseUrl + cursoSeleccionado._id, cursoSeleccionado)
      .then((response) => {
        var dataNueva = cursos;
        dataNueva.map((curso) => {
          if (cursoSeleccionado._id === curso._id) {
            curso.nombre = cursoSeleccionado.nombre;
            curso.creditos = cursoSeleccionado.creditos;
            curso.descripcion = cursoSeleccionado.descripcion;
          }
        });
        setCursos(dataNueva);
        abrirCerrarModalEditar();
      });
  };

  const abrirCerrarModalInstertar = () => {
    if(!modalInsertar){
      setCursoSeleccionado(defCourse)
    }
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarCurso = (curso:any, caso?: string) => {
    setCursoSeleccionado(curso);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    console.log(curso)
  };

  useEffect(() => {
    const fetchData = async () => {
      await peticionGet();
    };
    fetchData();
  }, []);

  

  return (
    <div className="App text-center">
      <Table onClose={abrirCerrarModalInstertar} selectCourse={seleccionarCurso} cursos={cursos}/>
      <ModalDialog isOpen={modalInsertar} onClose={abrirCerrarModalInstertar} onChange={handleChange} peticion={peticionPost}/>
      <ModalDialog isOpen={modalEditar} onClose={abrirCerrarModalEditar} curso={cursoSeleccionado} onChange={handleChange} peticion={peticionPatch}/>
      <ModalAlert isOpen={modalEliminar} onClose={abrirCerrarModalEliminar} curso={cursoSeleccionado} peticion={peticionDelete} />
      </div>
  );
}

export default App;
