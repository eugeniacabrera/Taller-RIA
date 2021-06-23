import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaseService } from 'src/services/clase.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  constructor(private router:Router, private claseService :ClaseService) { }

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
  mostrarTablaClases = true;
  mostrarFormAgregar = false;
  mostrarFormEditar = false;
  displayedColumns: string[] = ['titulo', 'fecha', 'descripcion', 'accion'];

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
    
    this.mostrarFormAgregar = false;
    this.mostrarTablaClases = false;
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



}
