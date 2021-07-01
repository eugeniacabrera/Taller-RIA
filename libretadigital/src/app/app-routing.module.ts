import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './components/cursos/cursos.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { InicioDocenteComponent } from './components/inicio-docente/inicio-docente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
  import { LoginComponent } from './components/login/login.component';
import { CursosDocenteComponent } from './components/cursos-docente/cursos-docente.component';
import { ClasesComponent } from './components/clases/clases.component';
import { EstudiantesCursoComponent } from './components/estudiantes-curso/estudiantes-curso.component';
import { ResumenCursoComponent } from './components/resumen-curso/resumen-curso.component';


const routes: Routes = [
  
  { path: 'Registrar', component: RegistroComponent },
  { path: 'InicioAdmin', component: InicioAdminComponent },
  { path: 'Roles', component: RolesComponent },
  { path: 'InicioDocente', component: InicioDocenteComponent },
  { path: 'Cursos', component: CursosComponent },
  { path: 'Estudiantes', component: EstudiantesComponent },
  { path: 'Usuarios', component: UsuariosComponent },
  { path: 'Ingresar', component: LoginComponent },
  { path: 'CursosDocente', component: CursosDocenteComponent },
  { path: 'Clases', component: ClasesComponent},
  { path: 'EstudiantesCurso', component: EstudiantesCursoComponent},
  { path: 'ResumenCurso', component: ResumenCursoComponent}
  


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }