import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';//<--------------Needs to delete error in routing
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//-------------->Para poder enlazar con los modelos 

import {TreeTableModule} from "ng-treetable"; //<--Tree table
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import {NgxPrintModule} from 'ngx-print';//impresion

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';




//components
import { NavigationComponent } from './component/navigation/navigation.component';
import { HomeComponent } from './component/home/home.component';
import { SeccionEditComponent } from './component/catalogo/seccion/seccion-edit/seccion-edit.component';
import { SeccionViewComponent } from './component/catalogo/seccion/seccion-view/seccion-view.component';
import { MetodoEditComponent } from './component/catalogo/metodo/metodo-edit/metodo-edit.component';
import { MetodoViewComponent } from './component/catalogo/metodo/metodo-view/metodo-view.component';
import { ReceptionComponent } from './component/reception/reception.component';
import { AtencionEditComponent } from './component/catalogo/atencion/atencion-edit/atencion-edit.component';
import { AtencionViewComponent } from './component/catalogo/atencion/atencion-view/atencion-view.component';
import { PacienteViewComponent } from './component/catalogo/paciente/paciente-view/paciente-view.component';
import { PacienteEditComponent } from './component/catalogo/paciente/paciente-edit/paciente-edit.component';
import { UsuarioEditComponent } from './component/catalogo/usuario/usuario-edit/usuario-edit.component';
import { UsuarioViewComponent } from './component/catalogo/usuario/usuario-view/usuario-view.component';
import { SubExamenEditComponent } from './component/catalogo/subExamen/sub-examen-edit/sub-examen-edit.component';
import { SubExamenViewComponent } from './component/catalogo/subExamen/sub-examen-view/sub-examen-view.component';
import { SubSeccionViewComponent } from './component/catalogo/subSeccion/sub-seccion-view/sub-seccion-view.component';
import { SubSeccionEditComponent } from './component/catalogo/subSeccion/sub-seccion-edit/sub-seccion-edit.component';
import { ExamenGeneralViewComponent } from './component/catalogo/examenGeneral/examen-general-view/examen-general-view.component';
import { ExamenGeneralEditComponent } from './component/catalogo/examenGeneral/examen-general-edit/examen-general-edit.component';

//Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MaterialComponents} from './materialComponents';
//services
import {SeccionService} from './services/seccion/seccion.service';
import {MetodoService} from './services/metodo/metodo.service';
import { RecepcionService } from './services/recepcion/recepcion.service';
import { PacienteService } from './services/paciente/paciente.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { AtencionService } from './services/atencion/atencion.service';
import { SubExamenService } from './services/subExamen/sub-examen.service';
import { SubSeccionService } from './services/subSeccion/sub-seccion.service';
import { ExamenGeneralService } from './services/examenGeneral/examen-general.service';
import { DialogoComponent } from './component/catalogo/examenGeneral/dialogo/dialogo.component';
import { InformeComponent } from './component/catalogo/informe/informe.component';
import { TablasComponent } from './component/catalogo/tablas/tablas.component';
import { CotizarComponent } from './component/cotizar/cotizar.component';
import { HistorialPacienteComponent } from './component/catalogo/paciente/historial-paciente/historial-paciente.component';
import { ResultadoViewComponent } from './component/resultado/resultado-view/resultado-view.component';
import { ResultadoEditComponent } from './component/resultado/resultado-edit/resultado-edit.component';
import { HematicaComponent } from './component/resultado/pdfLayout/hematica/hematica.component';
import { TipoExamenViewComponent } from './component/catalogo/tipoExamen/tipo-examen-view/tipo-examen-view.component';
import { TipoExamenEditComponent } from './component/catalogo/tipoExamen/tipo-examen-edit/tipo-examen-edit.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { LoginComponent } from './component/login/login.component';
import { DescuentoViewComponent } from './component/catalogo/descuento/descuento-view/descuento-view.component';
import { DescuentoEditComponent } from './component/catalogo/descuento/descuento-edit/descuento-edit.component';
import { MenuComponent } from './component/catalogo/menu/menu.component';
import { ModalComponent } from './component/catalogo/descuento/modal/modal.component';
import { RolViewComponent } from './component/catalogo/rol/rol-view/rol-view.component';
import { RolEditComponent } from './component/catalogo/rol/rol-edit/rol-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SeccionEditComponent,
    SeccionViewComponent,
    MetodoEditComponent,
    MetodoViewComponent,
    ReceptionComponent,
    AtencionEditComponent,
    AtencionViewComponent,
    PacienteViewComponent,
    PacienteEditComponent,
    UsuarioEditComponent,
    UsuarioViewComponent,
    SubExamenEditComponent,
    SubExamenViewComponent,
    SubSeccionViewComponent,
    SubSeccionEditComponent,
    ExamenGeneralViewComponent,
    ExamenGeneralEditComponent,
    DialogoComponent,
    InformeComponent,
    TablasComponent,
    CotizarComponent,    
    HistorialPacienteComponent,
    ResultadoViewComponent, 
    ResultadoEditComponent, 
    HematicaComponent, 
    TipoExamenViewComponent, 
    TipoExamenEditComponent, 
    MainNavComponent, 
    LoginComponent, 
    DescuentoViewComponent, 
    DescuentoEditComponent, 
    MenuComponent,
    AlertComponent,
    ModalComponent,
    RolViewComponent,
    RolEditComponent
  ],
  entryComponents: [DialogoComponent, ModalComponent],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
    MaterialComponents,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,//añadir para los formGruoups
    TreeTableModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
    NgxPrintModule
  ],
  providers: [
    SeccionService,
    MetodoService,
    RecepcionService,
    PacienteService,
    UsuarioService,
    AtencionService,
    SubExamenService,
    SubSeccionService,
    ExamenGeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

        // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
