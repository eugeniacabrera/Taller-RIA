import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/services/usuario-service.service';
import { CursoService } from './../../../services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  
  constructor(private router:Router, private cursoService :CursoService, private usuarioService: UsuarioServiceService) { }

  ngOnInit(): void {

    this.cursoService.CargarCursos().subscribe(
      (data: any[]) => {
        this.Cursos = data;
        console.log('this.Cursos', this.Cursos);
      },
      (error) => {
        console.log('fallo al cargar cursos ', error);
      },
      () => {}
    );

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



  Cursos = []
  Docentes = [];
  Usuarios = [];
  UsuariosRoles = [];
  displayedColumns: string[] = ['curso', 'accion'];
  dataSource = this.Cursos;
  mostrarFormAgregar = false;
  mostrarTablaCursos = true;
  mostrarFormEditar = false;  
  
  cursoSeleccionado = [];
  nombreCursoSeleccionado= '';
  programaCursoSeleccionado = '';
  descripcionCursoSeleccionado = '';

  CURSO = new FormGroup({
    nombre: new FormControl(''),
    descripcion:new FormControl(''),
    programa:new FormControl('')
  })

   CURSOEDITADO = new FormGroup({

    nombre: new FormControl(''),
    descripcion:new FormControl(''),
    programa:new FormControl('')
    
  })


  // muestra form agregar curso
  AgregarCurso = async () => {
    
    this.mostrarTablaCursos = false;
    this.mostrarFormEditar = false;
    //this.mostrarInfoCurso = false;
    this.mostrarFormAgregar = true;

  }

  // enviar objeto nuevo al servicio para que le pegue a la api
  Agregar() {
    
    let idUsuLogueado;
    const stringdata =  localStorage.getItem('datosLogueado');
    if(stringdata != null){
        const jsondata = JSON.parse(stringdata);
        idUsuLogueado = jsondata.id;   
        console.log('idusulogueado: ', idUsuLogueado);
    }

    let cursojson = {
        "nombre": this.CURSO.value.nombre,
        "descripcion": this.CURSO.value.descripcion,
        "programa": this.CURSO.value.programa,
        "userId": idUsuLogueado
    }

    this.cursoService.RegistrarCurso(cursojson)
    this.router.navigate(['/InicioAdmin']);
  }

  // CARGAR ROLES 
  
  async CargarRolesUsuario() {
  
    for (let usuario of this.Usuarios){
      let userroljson = await this.ObtenerRolUsuario(usuario.userName, usuario.id);
      
      this.UsuariosRoles.push(userroljson); 
    } 
    this.SetearUsersRoles(this.UsuariosRoles);     
  }

  async ObtenerRolUsuario(userName, usuarioid){
    let userroles = {}
    const data = await this.usuarioService.ObtenerRolesUsuario(userName);
    userroles = 
    {
      "userId": usuarioid,
      "userName": userName,
      "role": data
    }
    return userroles;
  }

  SetearUsersRoles(Usersroles){

    for(let u of Usersroles){

      if(u.role[0] === 'DOCENTE' || (u.role[1] !== null && u.role[1] === 'DOCENTE') ){
        this.Docentes.push(u);
    
      }
       
    }
    console.log('Docentes: ', this.Docentes);
  }

// FIN CARGAR ROLES

  // muestra form editar curso
  EditarCurso(nombreCurso){

    this.nombreCursoSeleccionado = nombreCurso;

    for(let curso of this.Cursos){
      
      if(curso.nombre === this.nombreCursoSeleccionado){
        this.cursoSeleccionado.push(curso);
        this.descripcionCursoSeleccionado = curso.descripcion;
        this.programaCursoSeleccionado = curso.programa; 

        // seteo los formcontrols de CURSOEDITADO:
        this.CURSOEDITADO.controls['nombre'].setValue(this.nombreCursoSeleccionado); 
        this.CURSOEDITADO.controls['descripcion'].setValue(this.descripcionCursoSeleccionado); 
        this.CURSOEDITADO.controls['programa'].setValue(this.programaCursoSeleccionado);     
      }
    }
    
    this.mostrarFormAgregar = false;
    this.mostrarTablaCursos = false;
    this.mostrarFormEditar = true;
    
  }

 

  // // enviar id del objeto editado al servicio para que le pegue a la api y lo actualice
  Editar(idDocente){
    let cursoeditadojson = {
        "id": this.cursoSeleccionado[0].id,
        "nombre": this.CURSOEDITADO.value.nombre,
        "descripcion": this.CURSOEDITADO.value.descripcion,
        "programa": this.CURSOEDITADO.value.programa,
        "docenteId": idDocente,

    }
    
    // llamar servicio
    this.cursoService.EditarCurso(cursoeditadojson, this.cursoSeleccionado[0].id);
    this.router.navigate(['/InicioAdmin']);

  }

  // // enviar id del objeto a eliminar al servicio para q la api lo elimine
  Eliminar(idcurso){
  
    this.cursoService.EliminarCurso(idcurso);
    this.router.navigate(['/InicioAdmin']);
    
  }



}
