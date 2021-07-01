import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

    readonly URL_API = 'https://ldgr1.cristianbauza.com/api/';

    public dataUsuarioLogueado: []
     

    constructor(private router:Router, private http: HttpClient){}

    Login(loginUsuario: object){
        return this.http.post(this.URL_API + 'Authenticate/login', loginUsuario);
    }
          
    setSession(authResult) {

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(authResult.expiration) );
        
        console.log("id_token:", authResult.token);
        console.log("expires_at",JSON.stringify(authResult.expiration) );
        
    }  
    
    public getToken(): string {

        return localStorage.getItem('id_token');
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("datosLogueado");
        localStorage.removeItem("idCursoSeleccionado");
        localStorage.removeItem("idClaseSeleccionada");
    }

    ObtenerDataInfoUsuarioLogueado(){
        return this.http.get(this.URL_API + 'Authenticate/user-info');
    }

    // setea data logueado y redirige a la pag inicio de acuerdo al rol
    setDataLogueado(datosLogueado){
        console.log('datos logueado: ', datosLogueado);
        const stringdata = JSON.stringify(datosLogueado);
        localStorage.setItem('datosLogueado', stringdata);

        // si es admin redirigo al inicio admin
        if(datosLogueado.roles == "ADMIN"){
            console.log('es admin');
            this.dataUsuarioLogueado = datosLogueado;
            this.router.navigate(['/InicioAdmin']);
        }

        // si es docente redirigo al inicio docente
        if(datosLogueado.roles == "DOCENTE"){
            console.log('es docente');
            this.dataUsuarioLogueado = datosLogueado;
            this.router.navigate(['/InicioDocente']);
        }

    }

   
    
   
}