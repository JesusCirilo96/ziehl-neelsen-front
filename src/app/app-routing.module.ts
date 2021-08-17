import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

//views
import { HomeComponent } from './component/home/home.component'

//Ruta para recepcion
import { ReceptionComponent } from './component/reception/reception.component'
//Ruta para Seccion
import { SeccionViewComponent } from './component/catalogo/seccion/seccion-view/seccion-view.component';
import { SeccionEditComponent } from './component/catalogo/seccion/seccion-edit/seccion-edit.component';
//Ruta para Metodo
import { MetodoViewComponent } from './component/catalogo/metodo/metodo-view/metodo-view.component';
import { MetodoEditComponent } from './component/catalogo/metodo/metodo-edit/metodo-edit.component';
//Rutas para paciente
import { PacienteViewComponent } from './component/catalogo/paciente/paciente-view/paciente-view.component';
import { PacienteEditComponent } from './component/catalogo/paciente/paciente-edit/paciente-edit.component';
//Rutas para usuario
import { UsuarioViewComponent } from './component/catalogo/usuario/usuario-view/usuario-view.component';
import { UsuarioEditComponent } from './component/catalogo/usuario/usuario-edit/usuario-edit.component';
//Rutas para atencion
import { AtencionViewComponent } from './component/catalogo/atencion/atencion-view/atencion-view.component';
import { AtencionEditComponent } from './component/catalogo/atencion/atencion-edit/atencion-edit.component';
//Rutas para ExamenGeneral
import { ExamenGeneralViewComponent } from './component/catalogo/examenGeneral/examen-general-view/examen-general-view.component';
import { ExamenGeneralEditComponent } from './component/catalogo/examenGeneral/examen-general-edit/examen-general-edit.component';
//Rutas para cotizacion
import { CotizarComponent } from 'src/app/component/cotizar/cotizar.component';
//Rutas para Resultado
import { ResultadoEditComponent } from './component/resultado/resultado-edit/resultado-edit.component';
import { ResultadoViewComponent } from './component/resultado/resultado-view/resultado-view.component';
//Rutas para el historial del paciente
import { HistorialPacienteComponent } from './component/catalogo/paciente/historial-paciente/historial-paciente.component';
//Rutas para Descuentos
import { DescuentoEditComponent } from './component/catalogo/descuento/descuento-edit/descuento-edit.component';
import { DescuentoViewComponent } from './component/catalogo/descuento/descuento-view/descuento-view.component';
//Rutas para el rol
import { RolEditComponent } from "./component/catalogo/rol/rol-edit/rol-edit.component";
import { RolViewComponent } from "./component/catalogo/rol/rol-view/rol-view.component";
//rutas de menu
import { MenuComponent} from './component/catalogo/menu/menu.component';
//ruta de la categoria
import { CategoriaEditComponent } from './component/catalogo/categoria/categoria-edit/categoria-edit.component';
import { CategoriaViewComponent } from './component/catalogo/categoria/categoria-view/categoria-view.component';
//Rutas para login
import { LoginComponent } from './component/login/login.component';

//Rutas para clasificacion paciente
import {ClasificacionPacienteEditComponent} from './component/catalogo/clasificacionPaciente/clasificacion-paciente-edit/clasificacion-paciente-edit.component';
import {ClasificacionPacienteViewComponent} from './component/catalogo/clasificacionPaciente/clasificacion-paciente-view/clasificacion-paciente-view.component';

import { CanActivate } from '@angular/router/src/utils/preactivation';
import { SeccionService } from './services/seccion/seccion.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamenComponent } from './component/catalogo/examenGeneral/examen/examen.component';
import { AdministracionComponent } from './component/administracion/administracion.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { PersonasComponent } from './component/catalogo/personas/personas.component';
import { DescuentoVistaComponent } from './component/descuento-vista/descuento-vista.component';
import { OrdenesComponent } from './component/ordenes/ordenes.component';

var routes: Routes = [
  { path: '', redirectTo:'inicio', pathMatch:'full',canActivate: [AuthGuard] },
  { path: 'personas', component:PersonasComponent ,canActivate: [AuthGuard] },
  { path: 'descuentos', component:DescuentoVistaComponent, canActivate:[AuthGuard] },
  { path: 'resultado', component:OrdenesComponent, canActivate:[AuthGuard]},
  { path: 'inicio', component:HomeComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'examen', component:ExamenComponent},
  { path: 'administracion', component:AdministracionComponent},
  { path: 'perfil', component:PerfilComponent },
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'login', component: LoginComponent },
  { path: 'recepcion', component: ReceptionComponent, canActivate: [AuthGuard] },
  { path: 'categoria', component: CategoriaViewComponent, canActivate: [AuthGuard] },
  { path: 'categoria/add', component: CategoriaEditComponent, canActivate: [AuthGuard] },
  { path: 'categoria/edit/:id', component: CategoriaEditComponent, canActivate: [AuthGuard] },
  { path: 'metodo', component: MetodoViewComponent, canActivate: [AuthGuard] },
  { path: 'metodo/add', component: MetodoEditComponent, canActivate: [AuthGuard] },
  { path: 'metodo/edit/:id', component: MetodoEditComponent, canActivate: [AuthGuard] },
  { path: 'paciente', component: PacienteViewComponent, canActivate: [AuthGuard] },
  { path: 'paciente/add', component: PacienteEditComponent, canActivate: [AuthGuard] },
  { path: 'paciente/edit/:id', component: PacienteEditComponent, canActivate: [AuthGuard] },
  { path: 'paciente/historial/:id', component: HistorialPacienteComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioViewComponent, canActivate: [AuthGuard] },
  { path: 'usuario/add', component: UsuarioEditComponent, canActivate: [AuthGuard] },
  { path: 'usuario/edit/:id', component: UsuarioEditComponent, canActivate: [AuthGuard] },
  { path: 'atencion', component: AtencionViewComponent, canActivate: [AuthGuard] },
  { path: 'atencion/add', component: AtencionEditComponent, canActivate: [AuthGuard] },
  { path: 'atencion/edit/:id', component: AtencionEditComponent, canActivate: [AuthGuard] },
  { path: 'examengeneral', component: ExamenGeneralViewComponent, canActivate: [AuthGuard] },
  { path: 'examengeneral/add', component: ExamenGeneralEditComponent, canActivate: [AuthGuard] },
  { path: 'examengeneral/edit/:id', component: ExamenGeneralEditComponent, canActivate: [AuthGuard] },
  { path: 'cotizar', component: CotizarComponent, canActivate: [AuthGuard] },
  { path: 'ordenes', component: ResultadoViewComponent, canActivate: [AuthGuard] },
  { path: 'ordenes/edit/:id', component: ResultadoEditComponent, canActivate: [AuthGuard] },
  { path: 'descuento', component: DescuentoViewComponent, canActivate: [AuthGuard] },
  { path: 'descuento/add', component: DescuentoEditComponent, canActivate: [AuthGuard] },
  { path: 'descuento/edit/:id', component: DescuentoEditComponent, canActivate: [AuthGuard] },
  { path: 'rol', component: RolViewComponent, canActivate: [AuthGuard] },
  { path: 'rol/add', component: RolEditComponent, canActivate: [AuthGuard] },
  { path: 'rol/edit/:id', component: RolEditComponent, canActivate: [AuthGuard] },
  { path: 'menu/add', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'menu/edit/:id', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'clasificacion/paciente', component: ClasificacionPacienteViewComponent, canActivate: [AuthGuard] },
  { path: 'clasificacion/paciente/add', component: ClasificacionPacienteEditComponent, canActivate: [AuthGuard] },
  { path: 'clasificacion/paciente/edit/:id', component: ClasificacionPacienteEditComponent, canActivate: [AuthGuard] },
  { path: 'seccion', component: SeccionViewComponent, canActivate: [AuthGuard] },
  { path: 'seccion/add', component: SeccionEditComponent, canActivate: [AuthGuard] },
  { path: 'seccion/edit/:id', component: SeccionEditComponent, canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
