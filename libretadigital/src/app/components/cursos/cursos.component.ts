import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/services/estudiante.service';
import { UsuarioServiceService } from 'src/services/usuario-service.service';
import { CursoService } from './../../../services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  
  constructor(
    private router:Router,
    private cursoService :CursoService,
    private usuarioService: UsuarioServiceService, 
    private estudianteService: EstudianteService) { }

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

    this.estudianteService.CargarEstudiantes().subscribe(
      (data: any[]) => {
      
      this.estudiantesList = data;
      
      },
      (error) =>{
        console.log('fallo al cargar estudiantes ', error);
      },
      () => {}
    );

  }


  Cursos = []
  Docentes = [];
  Usuarios = [];
  UsuariosRoles = [];
  displayedColumns: string[] = ['curso', 'accion'];
  displayedColumnsEstuCurso: string[] = ['nombre1', 'accion'];
  dataSource = this.Cursos;
  EstudiantesCurso = [];
  
  mostrarFormAgregar = false;
  mostrarTablaCursos = true;
  mostrarFormEditar = false; 
  mostrarInfoCurso = false; 
  
  cursoSeleccionado = [];
  nombreCursoSeleccionado= '';
  programaCursoSeleccionado = '';
  descripcionCursoSeleccionado = '';
  selectedDocente = '';
  idSelectedDocente = '';

  estudiantesList = []; // lo q contiene el multiselect
  estudiantesFormControl = new FormControl(); // lo q guarda el multiselect

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
    this.mostrarInfoCurso = false;
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
        
        this.cursoSeleccionado = [curso];
        
        this.descripcionCursoSeleccionado = curso.descripcion;
        this.programaCursoSeleccionado = curso.programa; 
        this.selectedDocente = curso.docente.userName;
        this.idSelectedDocente =  curso.docenteId;

        // seteo los formcontrols de CURSOEDITADO:
        this.CURSOEDITADO.controls['nombre'].setValue(this.nombreCursoSeleccionado); 
        this.CURSOEDITADO.controls['descripcion'].setValue(this.descripcionCursoSeleccionado); 
        this.CURSOEDITADO.controls['programa'].setValue(this.programaCursoSeleccionado);   
        // seteo docente
        // this.selectedDocente = this.cursoSeleccionado[0].docente.userName
        // this.idSelectedDocente =  this.cursoSeleccionado[0].docenteId
      }
    }
    
    this.mostrarFormAgregar = false;
    this.mostrarTablaCursos = false;
    this.mostrarInfoCurso = false;
    this.mostrarFormEditar = true;
    
  }

  // // enviar id del objeto editado al servicio para que le pegue a la api y lo actualice
  Editar(selectedDocente){
    
    for(let docente of this.Docentes){
      if(docente.userName == selectedDocente){
        this.idSelectedDocente =  docente.userId
      }
    }

    let cursoeditadojson = {
        "id": this.cursoSeleccionado[0].id,
        "nombre": this.CURSOEDITADO.value.nombre,
        "descripcion": this.CURSOEDITADO.value.descripcion,
        "programa": this.CURSOEDITADO.value.programa,
        "docenteId": this.idSelectedDocente,

    }
    console.log('cursoeditadojson :', cursoeditadojson)
    // llamar servicio
    this.cursoService.EditarCurso(cursoeditadojson, this.cursoSeleccionado[0].id);
    this.router.navigate(['/InicioAdmin']);

  }

  // // enviar id del objeto a eliminar al servicio para q la api lo elimine
  Eliminar(idcurso){
  
    this.cursoService.EliminarCurso(idcurso);
    this.router.navigate(['/InicioAdmin']);
    
  }

  VerCurso(nombre){
    this.nombreCursoSeleccionado = nombre;
    for(let curso of this.Cursos){
      if(curso.nombre === this.nombreCursoSeleccionado){
        this.cursoSeleccionado = [curso]; 
        console.log('this.cursoSeleccionado', this.cursoSeleccionado);
      }
    }

    // mostrar estudiantes que estan en el curso
    this.estudianteService.CargarEstudiantesCurso(this.cursoSeleccionado[0].id).subscribe(
      (data: any[]) => {
      this.EstudiantesCurso = data;
      console.log("this.EstudiantesCurso", this.EstudiantesCurso);
      },
      (error) =>{
        console.log('fallo al cargar estudiantes curso ', error);
      }
    );


    this.mostrarFormAgregar = false;
    this.mostrarTablaCursos = false;
    this.mostrarFormEditar = false;
    this.mostrarInfoCurso = true;
  }

  AgregarEstudiantesCurso(){
    let idsEstudiantes = []
    
    idsEstudiantes = this.estudiantesFormControl.value;
    console.log('idsEstudiantes: ' ,idsEstudiantes);
    for(let idEstu of idsEstudiantes){
      let json = {
        "estudianteId": idEstu,
        "cursoId": this.cursoSeleccionado[0].id
      }
      this.estudianteService.AgregarEstudianteCurso(json);
    }
    this.router.navigate(['/InicioAdmin']);
    
  }

  EliminarEstuCurso(idEstu){
    this.estudianteService.EliminarEstuCurso(idEstu);
    this.router.navigate(['/InicioAdmin']);
  }



}

