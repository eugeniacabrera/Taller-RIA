import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';

@Component({
  selector: 'app-estudiantes-curso',
  templateUrl: './estudiantes-curso.component.html',
  styleUrls: ['./estudiantes-curso.component.css']
})
export class EstudiantesCursoComponent implements OnInit {

  constructor(private router:Router, private estudianteService :EstudianteService) { }

  ngOnInit(): void {

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
  }

  mostrarTablaEstudiantesCurso = true;
  EstudiantesCurso = [];
  displayedColumns: string[] = ['documento', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'fnac'];
  idEstuSeleccionado = '';


}
