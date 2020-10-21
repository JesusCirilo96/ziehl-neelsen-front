import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

//views
import {HomeComponent} from './component/home/home.component'

//Ruta para recepcion
import {ReceptionComponent} from './component/reception/reception.component'
//Ruta para Seccion
import {SeccionViewComponent} from './component/catalogo/seccion/seccion-view/seccion-view.component';
import {SeccionEditComponent} from './component/catalogo/seccion/seccion-edit/seccion-edit.component';
//Ruta para Metodo
import {MetodoViewComponent} from './component/catalogo/metodo/metodo-view/metodo-view.component';
import {MetodoEditComponent} from './component/catalogo/metodo/metodo-edit/metodo-edit.component';
//Rutas para paciente
import { PacienteViewComponent } from './component/catalogo/paciente/paciente-view/paciente-view.component';
import { PacienteEditComponent } from './component/catalogo/paciente/paciente-edit/paciente-edit.component';
//Rutas para usuario
import { UsuarioViewComponent } from './component/catalogo/usuario/usuario-view/usuario-view.component';
import { UsuarioEditComponent } from './component/catalogo/usuario/usuario-edit/usuario-edit.component';
//Rutas para atencion
import { AtencionViewComponent } from './component/catalogo/atencion/atencion-view/atencion-view.component';
import { AtencionEditComponent } from './component/catalogo/atencion/atencion-edit/atencion-edit.component';
//Rutas para subSeccion
import { SubSeccionViewComponent } from './component/catalogo/subSeccion/sub-seccion-view/sub-seccion-view.component';
import { SubSeccionEditComponent } from './component/catalogo/subSeccion/sub-seccion-edit/sub-seccion-edit.component';
//Rutas para subExamen
import { SubExamenViewComponent } from './component/catalogo/subExamen/sub-examen-view/sub-examen-view.component';
import { SubExamenEditComponent } from './component/catalogo/subExamen/sub-examen-edit/sub-examen-edit.component';
//Rutas para ExamenGeneral
import {ExamenGeneralViewComponent  } from './component/catalogo/examenGeneral/examen-general-view/examen-general-view.component';
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
//Rutas para login
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [  
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'login', component: LoginComponent },
  { path:'recepcion', component: ReceptionComponent, canActivate: [AuthGuard]},
  { path:'categoria', component: SeccionViewComponent, canActivate: [AuthGuard]},
  { path:'categoria/add', component:SeccionEditComponent, canActivate: [AuthGuard]},
  { path:'categoria/edit/:id', component: SeccionEditComponent, canActivate: [AuthGuard]},
  { path:'metodo', component: MetodoViewComponent, canActivate: [AuthGuard]},
  { path:'metodo/add', component:MetodoEditComponent, canActivate: [AuthGuard]},
  { path:'metodo/edit/:id', component: MetodoEditComponent, canActivate: [AuthGuard]},
  { path:'paciente', component: PacienteViewComponent, canActivate: [AuthGuard]},
  { path:'paciente/add', component:PacienteEditComponent, canActivate: [AuthGuard]},
  { path:'paciente/edit/:id', component: PacienteEditComponent, canActivate: [AuthGuard]},
  { path:'paciente/historial/:id', component: HistorialPacienteComponent, canActivate: [AuthGuard] },
  { path:'usuario', component: UsuarioViewComponent, canActivate: [AuthGuard]},
  { path:'usuario/add', component:UsuarioEditComponent, canActivate: [AuthGuard]},
  { path:'usuario/edit/:id', component: UsuarioEditComponent, canActivate: [AuthGuard]},
  { path:'atencion', component: AtencionViewComponent, canActivate: [AuthGuard]},
  { path:'atencion/add', component:AtencionEditComponent, canActivate: [AuthGuard]},
  { path:'atencion/edit/:id', component: AtencionEditComponent, canActivate: [AuthGuard]},
  { path:'subseccion', component: SubSeccionViewComponent, canActivate: [AuthGuard]},
  { path:'subseccion/add', component: SubSeccionEditComponent, canActivate: [AuthGuard]},
  { path:'subseccion/edit/:id', component: SubSeccionEditComponent, canActivate: [AuthGuard]},
  { path:'subexamen', component: SubExamenViewComponent, canActivate: [AuthGuard]},
  { path:'subexamen/add', component: SubExamenEditComponent, canActivate: [AuthGuard]},
  { path:'subexamen/edit/:id', component: SubExamenEditComponent, canActivate: [AuthGuard]},
  { path:'examengeneral', component: ExamenGeneralViewComponent, canActivate: [AuthGuard]},
  { path:'examengeneral/add', component: ExamenGeneralEditComponent, canActivate: [AuthGuard]},
  { path:'examengeneral/edit/:id', component: ExamenGeneralEditComponent, canActivate: [AuthGuard]},
  { path:'cotizar', component: CotizarComponent, canActivate: [AuthGuard]},
  { path:'resultado', component: ResultadoViewComponent, canActivate: [AuthGuard]},
  { path:'resultado/edit/:id', component: ResultadoEditComponent, canActivate: [AuthGuard]},
  { path:'descuento', component: DescuentoViewComponent, canActivate: [AuthGuard]},
  { path:'descuento/add', component: DescuentoEditComponent, canActivate: [AuthGuard]},
  { path:'descuento/edit/:id', component: DescuentoEditComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
