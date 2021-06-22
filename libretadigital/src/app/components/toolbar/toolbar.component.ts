import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {}

  dataUsu = [];
  esAdmin: boolean;
  esDocente: boolean;
  esAdminDocente: boolean;


  ngDoCheck() {
   
    const stringdata =  localStorage.getItem('datosLogueado');
    
    if(stringdata != null){
        const jsondata = JSON.parse(stringdata);
        this.dataUsu = jsondata;   
        if ((jsondata.roles[0] === 'ADMIN' || jsondata.roles[0] === 'DOCENTE') && ((jsondata.roles[1] !== undefined) && (jsondata.roles[1] === 'ADMIN' || jsondata.roles[1] === 'DOCENTE'))) {
            this.esAdminDocente = true;
            this.esAdmin = false;
            this.esDocente = false;
        }else{
          if (jsondata.roles[0] === 'ADMIN') {
              this.esAdmin = true;
              this.esDocente = false;
              this.esAdminDocente = false;
          }else {
            if (jsondata.roles[0] === 'DOCENTE') {
              this.esDocente = true;
              this.esAdmin = false;
              this.esAdminDocente = false;
          }
          }
          
        }
        
        
    }
    else{
      this.dataUsu = null;
    }
  }
  
  Logout(){
    this.authService.logout();
    this.router.navigate(['/Ingresar']);
  }

}