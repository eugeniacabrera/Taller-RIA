import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/services/curso.service';
import { EstudianteService } from 'src/services/estudiante.service';
import { ClaseService } from 'src/services/clase.service';

@Component({
  selector: 'app-cursos-docente',
  templateUrl: './cursos-docente.component.html',
  styleUrls: ['./cursos-docente.component.css']
})
export class CursosDocenteComponent implements OnInit {

  constructor(private router:Router, private cursoService :CursoService, private estudianteService :EstudianteService, private claseService: ClaseService) { }

  ngOnInit(): void {
    
    // llama al servicio para pedir sus cursos (docente)
    this.cursoService.MisCursos().subscribe(
      (data: any[]) => {
        this.CursosDocente = data;
      },
      (error) => {
        console.log('fallo al cargar cursos del docente', error);
      },
      () => {
       console.log('this.CursosDocente', this.CursosDocente);
        
      }
    );

    

  }

  CursosDocente = []
  displayedColumns: string[] = ['curso', 'accion'];
  mostrarTablaCursosDocente = true;
  mostrarInfoCurso = false;
  
  cursoDocenteSeleccionado = [];
  idCursoSeleccionado = '';
  nombreCursoSeleccionado= '';
  programaCursoSeleccionado = '';
  descripcionCursoSeleccionado = '';
  docenteCursoSeleccionado = '';

  

  // muestra seccion en el html con la info curso, mas link a estudiantes y clases relacionadas.
  VerCurso(id){
    this.idCursoSeleccionado = id;
    localStorage.setItem('idCursoSeleccionado', this.idCursoSeleccionado); // para acceder desde clases
    
    for(let cursodocente of this.CursosDocente){
      if(cursodocente.id === this.idCursoSeleccionado){
        this.cursoDocenteSeleccionado.push(cursodocente);
  
        this.nombreCursoSeleccionado = cursodocente.nombre;;
        this.descripcionCursoSeleccionado = cursodocente.descripcion;
        this.programaCursoSeleccionado = cursodocente.programa; 
        this.docenteCursoSeleccionado = cursodocente.docente.userName; 

      }

    }
    
      
    this.mostrarTablaCursosDocente = false;
    this.mostrarInfoCurso = true;
  }


  





}
