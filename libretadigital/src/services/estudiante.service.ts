import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  readonly URL_API = 'https://ldgr1.cristianbauza.com/api/';

  constructor(private http: HttpClient){}

  public CargarEstudiantes(){
    return this.http.get(this.URL_API + 'Estudiantes');
  }

  public EliminarEstudiante(id: string){
    return this.http.delete(this.URL_API + 'Estudiantes/' + `${id}`).subscribe(
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

  public RegistrarEstudiante(Estudiante: object){

    console.log('EstudianteJSON: ', Estudiante);
    return this.http.post(this.URL_API + 'Estudiantes', Estudiante).subscribe(
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

  public EditarEstudiante(Estudiante: object, id: string){
    return this.http.put(this.URL_API + 'Estudiantes/' + `${id}`, Estudiante).subscribe(
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

  public CargarEstudiantesCurso(id: string){

    let httpParams = new HttpParams().set('cursoId', id);
    return this.http.get(this.URL_API + 'EstudiantesCursos', {params: httpParams});
  }

  public AgregarEstudianteCurso(EstuCurso: object){
    return this.http.post(this.URL_API + 'EstudiantesCursos', EstuCurso).subscribe(
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

  public EliminarEstuCurso(id: string){
    return this.http.delete(this.URL_API + 'EstudiantesCursos/' + `${id}`).subscribe(
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

  public CursosEstudiante(idEstu: string){
      let httpParams = new HttpParams().set('estudianteId', idEstu);
      return this.http.get(this.URL_API + 'EstudiantesCursos/Estudiante', {params: httpParams});
  }
  

  

}
