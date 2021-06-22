import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioServiceService } from 'src/services/usuario-service.service';

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  readonly URL_API = 'https://ldgr1.cristianbauza.com/api/';
 

  constructor(private http: HttpClient, private usuarioService: UsuarioServiceService){}

  public CargarCursos(){
    return this.http.get(this.URL_API + 'Cursos');
  }

  public RegistrarCurso(Curso: object){
    return this.http.post(this.URL_API + 'Cursos', Curso).subscribe(
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

  public EditarCurso(CursoEditado: object, id: string){
    return this.http.put(this.URL_API + 'Cursos/'+ `${id}`, CursoEditado).subscribe(
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

  public EliminarCurso(id: string){
    return this.http.delete(this.URL_API + 'Cursos/'+ `${id}`).subscribe(
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

  public MisCursos(){
    return this.http.get(this.URL_API + 'Cursos/MisCursos');
  }


}
