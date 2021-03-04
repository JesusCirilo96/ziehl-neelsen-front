import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RolService } from 'src/app/services/rol/rol.service'

import { environment } from '../../environments/environment';
import { User } from '../../app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    API_URI = environment.apiUrl;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    rolUsuario: any = [];

    constructor(private http: HttpClient, private rolService: RolService,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        //return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        return this.http.get<any>(`${this.API_URI}/usuario/authenticate/${username}/${password}`)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response && user.token
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                    this.getUsuario(user.usuarioId)

                    this.rolService.getRolMenu(user.usuarioId).subscribe(
                        response =>{
                          localStorage.setItem("currentMenu", JSON.stringify(response['menu']));
                        },error =>{
                          console.log("Error al obtener los menus por ID del rol: " + error)
                        }
                    );
                }

                console.log(user);

                return user;
            }));
    }

    logout() {
        console.log("LOGOUT");
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRol');
        localStorage.removeItem('currentMenu');
        this.currentUserSubject.next(null);
    }

    getUsuario(usuarioId) {
        this.rolService.getRolByUsuario(usuarioId).subscribe(
            res => {
                this.rolUsuario = res['rol'];
                console.log(this.rolUsuario[0].rolId)
                console.log(this.rolUsuario);
                localStorage.setItem('currentRol',JSON.stringify(this.rolUsuario));

            },
            err => {
                console.log(err);
            }
        )

    }
}