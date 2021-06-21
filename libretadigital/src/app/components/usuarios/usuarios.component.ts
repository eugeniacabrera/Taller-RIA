import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/services/usuario-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private router:Router, private usuarioService: UsuarioServiceService) { }
  
  Usuarios = [];
  mostrarTablaUsuarios = true;
  mostrarTablaAgregar= false;
  
  
  displayedColumns: string[] = ['username', 'email'];
  dataSource = this.Usuarios; //datos de la tabla
  mostrarTabla = true;
  
  ngOnInit(): void {
    
    this.usuarioService.CargarUsuarios().subscribe(
      (data: any[]) => {
      
      this.Usuarios = data;
      
      },
      (error) =>{
        console.log('fallo al cargar usuarios ', error);
      }
    );
  }



  USU = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  USUEDITADO = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  

  // muestra form editar usuario
  AgregarUsuario = async () => {
   
    this.mostrarTablaUsuarios = false;
    this.mostrarTablaAgregar = true; 

  }

  // enviar objeto nuevo al servicio para que le pegue a la api
  Agregar() {
    // objeto que se le envia a la api
    let usuariojson = {
        "username": this.USU.value.username,
        "email": this.USU.value.email,
        "password": this.USU.value.password   
    }

    // llamo al servicio RegistrarUsuario
    this.usuarioService.RegistrarUsuario(usuariojson);
    
    this.router.navigate(['/InicioAdmin']);

  }

 
}
