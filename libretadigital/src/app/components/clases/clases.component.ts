import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaseService } from 'src/services/clase.service';
import { EstudianteService } from 'src/services/estudiante.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  constructor(private router:Router, private claseService :ClaseService, private estudianteService: EstudianteService) { }

  ngOnInit(): void {

    this.claseService.CargarClases().subscribe(
      (data: any[]) => {
        this.Clases = data;
        console.log('this.Clases', this.Clases);
      },
      (error) => {
        console.log('fallo al cargar las clases ', error);
      },
      () => {}
    );

  }

  Clases = [];
  idClaseSeleccionada = '';
  tituloClaseSeleccionada = '';
  fechaClaseSeleccionada = '';
  descripcionClaseSeleccionada = '';
  idEstudianteSeleccionado = '';
  mostrarTablaClases = true;
  mostrarFormAgregar = false;
  mostrarFormEditar = false;
  mostrarAsistencias = false;
  mostrarTablaPasarLista = false;
  mostrarTablaEditarAsistencia = false;
  displayedColumns: string[] = ['titulo', 'fecha', 'descripcion', 'accion'];
  displayedColumnsAsistencias: string[] = ['estudiante', 'asistencia'];
  displayedColumnsPasarLista: string[] = ['nombre', 'asistencia'];
  AsistenciasEstudiantes = [];
  EstudiantesCurso = [];

  CLASE = new FormGroup({
    titulo: new FormControl(''),
    fecha:new FormControl(''),
    descripcion:new FormControl('')
  })

  CLASEEDITADA = new FormGroup({
    titulo: new FormControl(''),
    fecha:new FormControl(''),
    descripcion:new FormControl('')
  })

  // muestra form agregar curso
  AgregarClase = async () => {
    
    this.mostrarTablaClases = false;
    this.mostrarFormEditar = false;
    this.mostrarAsistencias = false;
    this.mostrarTablaPasarLista = false;
    this.mostrarTablaEditarAsistencia = false;
    this.mostrarFormAgregar = true;

  }

  // enviar objeto nuevo al servicio para que le pegue a la api
  Agregar() {

    let idCurso = localStorage.getItem('idCursoSeleccionado');
    
    let clasejson = {
        "titulo": this.CLASE.value.titulo,
        "fecha": this.CLASE.value.fecha,
        "descripcion": this.CLASE.value.descripcion,
        "cursosId": idCurso
         
    }

    this.claseService.RegistrarClase(clasejson)
    this.router.navigate(['/CursosDocente']);
  }

  // muestra form editar clase
  EditarClase(id){

    this.idClaseSeleccionada = id;

    for(let clase of this.Clases){
      
      if(clase.id === this.idClaseSeleccionada){
        this.tituloClaseSeleccionada = clase.titulo;
        this.fechaClaseSeleccionada = clase.fecha;
        this.descripcionClaseSeleccionada = clase.descripcion;

        // seteo los formcontrols de CURSOEDITADO:
        this.CLASEEDITADA.controls['titulo'].setValue(this.tituloClaseSeleccionada); 
        this.CLASEEDITADA.controls['fecha'].setValue(this.fechaClaseSeleccionada); 
        this.CLASEEDITADA.controls['descripcion'].setValue(this.descripcionClaseSeleccionada);     
      }
    }
    
    this.mostrarTablaPasarLista = false;
    this.mostrarFormAgregar = false;
    this.mostrarTablaClases = false;
    this.mostrarAsistencias = false;
    this.mostrarTablaEditarAsistencia = false;
    this.mostrarFormEditar = true;
    
  }

  // enviar objeto nuevo al servicio para que le pegue a la api
  Editar() {

    let idCurso = localStorage.getItem('idCursoSeleccionado');
    
    let clasejson = {
        "id": this.idClaseSeleccionada,
        "titulo": this.CLASEEDITADA.value.titulo,
        "fecha": this.CLASEEDITADA.value.fecha,
        "descripcion": this.CLASEEDITADA.value.descripcion,
        "cursosId": idCurso
         
    }

    this.claseService.EditarClase(clasejson, this.idClaseSeleccionada);
    this.router.navigate(['/CursosDocente']);
  }

  Eliminar(id){
    this.claseService.EliminarClase(id);
    this.router.navigate(['/CursosDocente']);
  }

  Asistencias(idClase){

    let idCurso = localStorage.getItem('idCursoSeleccionado');

    this.idClaseSeleccionada = idClase;
    
    this.claseService.ObtenerAsistenciasClase(this.idClaseSeleccionada).subscribe(
      (data: any[]) => {
        this.AsistenciasEstudiantes = data;
        console.log('this.AsistenciasEstudiantes', this.AsistenciasEstudiantes);
      },
      (error) => {
        console.log('fallo al cargar las asistencias ', error);
      },
      () => {}
    );

    this.mostrarTablaPasarLista = false;
    this.mostrarFormAgregar = false;
    this.mostrarTablaClases = false;
    this.mostrarFormEditar = false;
    this.mostrarTablaEditarAsistencia = false;
    this.mostrarAsistencias = true;

  }

  // muestra form para editar asistencia
  EditarAsistencia(idEstudiante){

    this.idEstudianteSeleccionado = idEstudiante;


    this.mostrarFormAgregar = false;
    this.mostrarTablaClases = false;
    this.mostrarFormEditar = false;
    this.mostrarAsistencias = false;
    this.mostrarTablaPasarLista = false;
    this.mostrarTablaEditarAsistencia = true;
  }

  // llama al servicio para editar la asistencia de un estudiante
  EditarAsistenciaService(idEstudiante, selectedAsistencia){

    let idClaseSeleccionada = localStorage.getItem('idClaseSeleccionada');
    let asisteEstu;
    if (selectedAsistencia == "false"){
      asisteEstu = false;
    } 
    else{
      asisteEstu = true;
    }

    let json = {
      "estudiantesId": idEstudiante,
      "clasesId": idClaseSeleccionada,
      "asiste": asisteEstu
    }
    
    this.claseService.EditarAsistenciaEstu(json);
    this.router.navigate(['/CursosDocente']);

  }

  PasarLista(idClase){
    this.idClaseSeleccionada = idClase;
    localStorage.setItem('idClaseSeleccionada', this.idClaseSeleccionada);

    let idcurso = localStorage.getItem('idCursoSeleccionado');
    this.estudianteService.CargarEstudiantesCurso(idcurso).subscribe(
      (data: any[]) => {
      this.EstudiantesCurso = data;
      console.log("this.EstudiantesCurso", this.EstudiantesCurso);
      },
      (error) =>{
        console.log('fallo al cargar estudiantes curso ', error);
      }
    );

    this.mostrarFormAgregar = false;
    this.mostrarTablaClases = false;
    this.mostrarFormEditar = false;
    this.mostrarAsistencias = false;
    this.mostrarTablaEditarAsistencia = false;
    this.mostrarTablaPasarLista = true;
  }



}
