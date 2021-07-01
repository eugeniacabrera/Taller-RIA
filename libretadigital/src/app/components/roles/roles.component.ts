import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/services/usuario-service.service';



@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private router:Router, private usuarioService: UsuarioServiceService) { }
  
  Usuarios = [];
  UsuariosRoles = [];
  displayedColumns: string[] = ['usuario', 'rol', 'accion'];
  dataSource = []; //datos de la tabla
  mostrarTabla = true;
  mostrarTablaEditar = false;
  usuarioSeleccionado: ''; // el que selecciona para editar el rol
  selectedRol = '';

    ngOnInit(): void {
   
    this.usuarioService.CargarUsuarios().subscribe(
      (data: any[]) => {
      
      this.Usuarios = data;
      console.log('Usuarios: ', this.Usuarios);
      
      },
      (error) =>{
        console.log('fallo al cargar usuarios ', error);
      },
      () => {
        this.CargarRolesUsuario();
      }
    );

  }

  ngOnChanges() {
     this.usuarioService.CargarUsuarios().subscribe(
      (data: any[]) => {
        this.Usuarios = data;
        console.log('Usuarios: ', this.Usuarios);
      },
      (error) =>{
        console.log('fallo al cargar usuarios ', error);
      },
      () => {
        this.CargarRolesUsuario();
      }
    );
  }
  
  // CARGAR ROLES 
  
  async CargarRolesUsuario() {
  
    for (let usuario of this.Usuarios){

      let userroljson = await this.ObtenerRolUsuario(usuario.userName);
      this.UsuariosRoles.push(userroljson); 
   
    } 
    this.SetearDataSource(this.UsuariosRoles);     
  }
  
  async ObtenerRolUsuario(userName){
    let userroles = {}
    const data = await this.usuarioService.ObtenerRolesUsuario(userName);
    userroles = 
    {
      "userName": userName,
      "role": data
    }
    return userroles;
  }

  SetearDataSource(Usersroles){
    this.dataSource = Usersroles;
    console.log(this.dataSource);
  }

// FIN CARGAR ROLES
  
  EditarRol(userName) {
    
    this.mostrarTabla = false; // oculto tabla lista de usuarios con sus roles
    this.mostrarTablaEditar = true;
    this.usuarioSeleccionado = userName; // seteo atributo para usarlo en la vista

  }

  GuardarCambios(usuarioSeleccionado, selectedRol){
    this.usuarioService.EditarRol(usuarioSeleccionado, selectedRol);
    this.router.navigate(['/InicioAdmin']);

  }

}
