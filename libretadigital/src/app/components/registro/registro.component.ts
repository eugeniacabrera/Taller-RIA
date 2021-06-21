import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/services/usuario-service.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  USU = new FormGroup({
    username: new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  })

  constructor(private router:Router, private usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {
  }

  Registrar() {
    
    let usuariojson = {
        "username": this.USU.value.username,
        "email": this.USU.value.email,
        "password": this.USU.value.password,
    }

    console.log('usuariojson: ', usuariojson);
    
    let respuesta = this.usuarioService.RegistrarUsuario(usuariojson);
    console.log('respuesta: ', respuesta);

    this.router.navigate(['/Ingresar']);
  }

}
