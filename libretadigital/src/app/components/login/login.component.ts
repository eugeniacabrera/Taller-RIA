import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/services/AuthService';
import { UsuarioServiceService } from './../../../services/usuario-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  LOGINUSU = new FormGroup({
    username: new FormControl(''),
    password:new FormControl('')
  })

  constructor(private authService: AuthService, private usuarioService: UsuarioServiceService) { }
  ngOnInit(): void {
  }

  Ingresar(){
    let loginUsuarioJson = {
        "username": this.LOGINUSU.value.username,
        "password": this.LOGINUSU.value.password,
    }
    this.authService.Login(loginUsuarioJson).subscribe(
      (data: any[]) => {
        console.log('Login correcto!!');
        console.log('data: ', data);
        this.SetearSession(data);
      },
      (error) => {
        console.log('Login incorrecto! ', error);
      }
    );
  }

  SetearSession(data){
    this.authService.setSession(data);
    this.ObtenerDataLogueado();
  }

  // pido a la api toda la info del usuario logueado
  ObtenerDataLogueado(){
    this.authService.ObtenerDataInfoUsuarioLogueado().subscribe(
      (data: any[]) => {
        console.log('data info usu logueado: ', data);
        this.SetearDataLogueado(data);
      },
      (error) => {
        console.log('Obtención de datos del usuario logueado errónea', error);
      }
    );
  }
    
  SetearDataLogueado(datosLogueado){
    this.authService.setDataLogueado(datosLogueado);
  }



}
