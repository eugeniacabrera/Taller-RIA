import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/AuthService';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  dataUsu = [];
 
  ngDoCheck() {
   
    const stringdata =  localStorage.getItem('datosLogueado');
    
    if(stringdata != null){
        const jsondata = JSON.parse(stringdata);
        this.dataUsu = jsondata;         
    }
    else{
      this.dataUsu = null;
    }
  }
  

  // y desde toolbar html creo que pdoes acceder
  // en html <a6b-header [lastName]="lastEdited"></a6b-header>

  //dataUsu = this.authService.dataUsuarioLogueado;


}