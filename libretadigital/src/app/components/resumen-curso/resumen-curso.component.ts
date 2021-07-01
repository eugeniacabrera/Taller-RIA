import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaseService } from 'src/services/clase.service';
import { EstudianteService } from 'src/services/estudiante.service';

@Component({
  selector: 'app-resumen-curso',
  templateUrl: './resumen-curso.component.html',
  styleUrls: ['./resumen-curso.component.css']
})
export class ResumenCursoComponent implements OnInit {

  constructor(private router:Router, private claseService: ClaseService, private estudianteService :EstudianteService) { }

  ngOnInit(): void {

    let idCursoSeleccionado = localStorage.getItem('idCursoSeleccionado');
     this.estudianteService.CargarEstudiantesCurso(idCursoSeleccionado).subscribe(
      (data: any[]) => {
        this.EstudiantesCurso = data;
      },
      (error) =>{
        console.log('fallo al cargar estudiantes curso ', error);
      },
      () => {}

    );

    this.claseService.CargarClases().subscribe(
      (data: any[]) => {
        this.Clases = data;
        
      },
      (error) => {
        console.log('fallo al cargar las clases ', error);
      },
      () => {

        for(let clase of this.Clases){

          // me trae las asistencias de todos los estudiantes para esa clase
            this.claseService.ObtenerAsistenciasClase(clase.id).subscribe(
              (data2: any[]) => {
                this.arrayAsistenciasClase = data2
              },
              (error) => {
                console.log('fallo al cargar asistencias clase ', error);
              },
              () => {
                this.AsistenciasClases.push(this.arrayAsistenciasClase);
                //this.SetearAsistenciasClase(this.arrayAsistenciasClase);
                this.VerResumenCurso();
              }
            )          
        }
      
        
                
      }
    );

  }

  mostrarResumenCurso = false;
  displayedColumnsPromEstuCurso: string[] = ['nombre', 'asistencias', 'noasistencias'];
  EstudiantesCurso = [];
  Clases = [];
  arrayAsistenciasClase = [];
  AsistenciasClases = [];
  PromedioAsistenciasEstu = [];
  cantTotalNO: number = 0;
  cantTotalSI: number = 0;
  totalEstudiantes: number = 0;
  cantTotalNOPorcentaje: number = 0;
  cantTotalSIPorcentaje: number = 0;


  // CARGAR ASISTENCIAS CLASES DE LOS ESTUDIANTES 

    SetearAsistenciasClase(arrayAsistenciasClase){
    // seteo todas las asistencias de la clase
    this.AsistenciasClases.push(arrayAsistenciasClase);
    
    }

  // FIN CARGA ASISTENCIAS CLASES DE LOS ESTUDIANTES 


  VerResumenCurso(){
    
   
    let cantClases = 0;
   
    let cantSI: number= 0;
    let cantNOporcentaje: number = 0;
    let cantSIporcentaje: number = 0;
  
    let nomEstu = '';
    let estuAsistenciasPromedio = {}
    
    for(let estudiantecurso of this.EstudiantesCurso){

      this.totalEstudiantes = this.totalEstudiantes + 1;
     
      nomEstu = estudiantecurso.estudiante.primerNombre;
      
      
      cantSI = 0;
      cantNOporcentaje = 0;
      cantSIporcentaje = 0;
      cantClases = 0;

      for(let clase of this.Clases){
        cantClases = cantClases + 1;
        
       
        for(let asistencia of this.AsistenciasClases){
          for(let objectjson of asistencia){

            if(clase.id ===  objectjson.clasesId ){
              if(objectjson.estudiantesId == estudiantecurso.estudiantesId){
                if(objectjson.asiste === true){
                  cantSI = cantSI + 1 ;
                  this.cantTotalSI = this.cantTotalSI + 1; 
                  
                }
               
              }
            }
          }
        
            
            
        }
      }

      // calculos asistencia por estudiante
      console.log('cantSI: ' +  cantSI + ' nombre: ' + nomEstu);
      cantSIporcentaje = (cantSI * 100) / (cantClases);
      cantNOporcentaje = 100 - (cantSIporcentaje);
      
      estuAsistenciasPromedio = {
        "nombre": nomEstu,
        "cantSIporcentaje": cantNOporcentaje, // lo pongo al reves porque me lo pone al reves y no se por que
        "cantNOporcentaje": cantSIporcentaje
      }
         
      this.PromedioAsistenciasEstu.push(estuAsistenciasPromedio);
      
    }

    
    // calculos promedio total clase asistencias
    this.cantTotalSIPorcentaje = (this.cantTotalSI * 100) / (cantClases);
    this.cantTotalNOPorcentaje =  (this.cantTotalSIPorcentaje) - 100;

    console.log('this.PromedioAsistenciasEstu', this.PromedioAsistenciasEstu);
    this.mostrarResumenCurso = true;

  }

}
