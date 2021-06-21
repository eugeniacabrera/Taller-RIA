import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';

// export interface PeriodicElement {
//   documento: number;
//   apellido1: string;
//   apellido2: string;
//   nombre1: string;
//   nombre2: string;
//   fnac: string
// }


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  constructor(private router:Router, private estudianteService :EstudianteService) { }

  ngOnInit(): void {
    
    this.estudianteService.CargarEstudiantes().subscribe(
      (data: any[]) => {
      this.Estudiantes = data;
      console.log("this.Estudiantes", this.Estudiantes);
      },
      (error) =>{
        console.log('fallo al cargar estudiantes ', error);
      }
    );
  }

  ESTU = new FormGroup({
    documento: new FormControl(''),
    nombre1: new FormControl(''),
    nombre2: new FormControl(''),
    apellido1: new FormControl(''),
    apellido2: new FormControl(''),
    fnac: new FormControl(''),
  })

  ESTUEDITADO = new FormGroup({
    documento: new FormControl(''),
    nombre1: new FormControl(''),
    nombre2: new FormControl(''),
    apellido1: new FormControl(''),
    apellido2: new FormControl(''),
    fnac: new FormControl(''),
  })

  mostrarTablaEstudiantes = true;
  mostrarTablaAgregar= false;
  mostrarTablaEditar = false;
  Estudiantes = [];
  displayedColumns: string[] = ['documento', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'fnac'  ,'accion'];
  idEstuSeleccionado = '';

  

  // muestra form editar estudiante
  AgregarEstudiante = async () => {
    
    this.mostrarTablaEstudiantes = false;
    this.mostrarTablaEditar = false;
    this.mostrarTablaAgregar = true;

  }

  // enviar objeto nuevo al servicio para que le pegue a la api
  Agregar() {


    // objeto que se le envia a la api
    let estudiantejson = {
        "documento": this.ESTU.value.documento,
        "primerApellido": this.ESTU.value.apellido1,
        "segundoApellido": this.ESTU.value.apellido2,
        "primerNombre": this.ESTU.value.nombre1,
        "segundoNombre": this.ESTU.value.nombre2,
        "fechaNacimiento": this.ESTU.value.fnac 
    }

    this.estudianteService.RegistrarEstudiante(estudiantejson);
    this.router.navigate(['/InicioAdmin']);
  }

  // muestro form editar estudiante
  EditarEstudiante(idEstu){
    
    for(let estu of this.Estudiantes){
      if(estu.id === idEstu){
        this.idEstuSeleccionado = estu.id;
        // seteo los formcontrols de ESTUEDITADO
        this.ESTUEDITADO.controls['documento'].setValue(estu.documento);
        this.ESTUEDITADO.controls['apellido1'].setValue(estu.primerApellido);
        this.ESTUEDITADO.controls['apellido2'].setValue(estu.segundoApellido);
        this.ESTUEDITADO.controls['nombre1'].setValue(estu.primerNombre);
        this.ESTUEDITADO.controls['nombre2'].setValue(estu.segundoNombre);
        this.ESTUEDITADO.controls['fnac'].setValue(estu.fechaNacimiento);
      }
    }

    this.mostrarTablaAgregar = false;
    this.mostrarTablaEstudiantes = false;
    this.mostrarTablaEditar = true;
  }

  // enviar id del objeto editado al servicio para que le pegue a la api y lo actualice
  Editar(){
    // objeto que se le envia a la api
    let estudiantejson = {
        "id": this.idEstuSeleccionado,
        "documento": this.ESTUEDITADO.value.documento,
        "primerApellido": this.ESTUEDITADO.value.apellido1,
        "segundoApellido": this.ESTUEDITADO.value.apellido2,
        "primerNombre": this.ESTUEDITADO.value.nombre1,
        "segundoNombre": this.ESTUEDITADO.value.nombre2,
        "fechaNacimiento": this.ESTUEDITADO.value.fnac,
    }

    this.estudianteService.EditarEstudiante(estudiantejson, this.idEstuSeleccionado);
    this.router.navigate(['/InicioAdmin']);

  }

  // enviar id del objeto a eliminar al servicio para q la api lo elimine
  Eliminar(idestudiante){
    
    this.estudianteService.EliminarEstudiante(idestudiante);
    this.router.navigate(['/InicioAdmin']);

  }
}
