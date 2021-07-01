import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ClaseService {

  readonly URL_API = 'https://ldgr1.cristianbauza.com/api/';
 
  constructor(private http: HttpClient){}

  public CargarClases(){
    let idCurso = localStorage.getItem('idCursoSeleccionado');
    return this.http.get(this.URL_API + 'Clases/Cursos/' + `${idCurso}`);
  }

  public RegistrarClase(Clase: object){
    return this.http.post(this.URL_API + 'Clases', Clase).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }

  public EditarClase(Clase: object, id: string){
    return this.http.put(this.URL_API + 'Clases/' + `${id}`, Clase).subscribe(
        (val) => {
            console.log("PUT call successful value returned in body", 
                        val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        });
  }

  public EliminarClase(id: string){
    return this.http.delete(this.URL_API + 'Clases/'+ `${id}`).subscribe(
        (val) => {
            console.log("DELETE call successful value returned in body", 
                        val);
        },
        response => {
            console.log("DELETE call in error", response);
        },
        () => {
            console.log("The DELETE observable is now completed.");
        });

  }

  public ObtenerAsistenciasClase(claseId: string){
    return this.http.get(this.URL_API + 'ClaseEstudiantes/Clase/' + `${claseId}`);
  }

  public EditarAsistenciaEstu(Asistencia: object){
   
    return this.http.post(this.URL_API + 'ClaseEstudiantes', Asistencia).subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  
  }


}
