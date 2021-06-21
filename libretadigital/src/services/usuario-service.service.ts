import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  readonly URL_API = 'https://ldgr1.cristianbauza.com/api/';

  constructor(private http: HttpClient){}

  public RegistrarUsuario(Usuario: object){
    return this.http.post(this.URL_API + 'Authenticate/register', Usuario).subscribe(
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

  public CargarUsuarios(){
    return this.http.get(this.URL_API + 'Authenticate/users');

  }

  public async ObtenerRolesUsuario(NombreUsuario: string){
    
    let httpParams = new HttpParams().set('username', NombreUsuario);

    return await this.http.get(this.URL_API + 'Authenticate/users-role',{params: httpParams} ).toPromise();

  }

  public EditarRol(NombreUsuario: string, rol: string){
    let userrol = {
      
    "userName": NombreUsuario,
    "role": rol

    }
    return this.http.post(this.URL_API + 'Authenticate/users-role', userrol).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", 
                        val);
      },
      error => {
        console.log("POST call in error", error);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
  }

}
