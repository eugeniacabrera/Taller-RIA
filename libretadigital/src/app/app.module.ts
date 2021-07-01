import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule}from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { RolesComponent } from './components/roles/roles.component';
import { InicioDocenteComponent } from './components/inicio-docente/inicio-docente.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioServiceService } from 'src/services/usuario-service.service';
import { TokenInterceptor } from './interceptors';
import { AuthService } from 'src/services/AuthService';
import { LoginComponent } from './components/login/login.component';
import { CursoService } from 'src/services/curso.service';
import { EstudianteService } from 'src/services/estudiante.service';
import { CursosDocenteComponent } from './components/cursos-docente/cursos-docente.component';
import { ClasesComponent } from './components/clases/clases.component';
import { ClaseService } from 'src/services/clase.service';
import { EstudiantesCursoComponent } from './components/estudiantes-curso/estudiantes-curso.component';
import { ResumenCursoComponent } from './components/resumen-curso/resumen-curso.component';


//<mat-toolbar>
@NgModule({
  declarations: [
    AppComponent,
    
    ToolbarComponent,
    FooterComponent,
    RegistroComponent,
    InicioComponent,
    InicioAdminComponent,
    RolesComponent,
    InicioDocenteComponent,
    CursosComponent,
    EstudiantesComponent,
    UsuariosComponent,
    LoginComponent,
    CursosDocenteComponent,
    ClasesComponent,
    EstudiantesCursoComponent,
    ResumenCursoComponent,
    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent },
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
   MatCardModule,
   MatFormFieldModule,
   MatInputModule,
   MatGridListModule,
   MatTableModule,
   MatCheckboxModule,
   MatSelectModule
   
  ],
  providers: [ClaseService, EstudianteService, CursoService, UsuarioServiceService, AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }