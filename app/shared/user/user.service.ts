import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Router} from "@angular/router-deprecated";
import {User} from "./user";
import {Config} from "../config";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {getString, setString} from "application-settings";

@Injectable()
export class UserService {
    constructor(private _http: Http, private _router: Router) {}

    login(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this._http.post(
          Config.apiUrl + "auth",
          JSON.stringify({
            email: user.email,
            password: user.password,
            grant_type: "password"
          }),
          { headers: headers }
        )
        .map(response => response.json())
        .do(data => {
            console.log(data);
            if(data.token){
                setString('token', data.token);
            }

        })
        .catch(this.handleErrors);
    }

    register(user: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this._http.post(
            Config.apiUrl + "user/create",
            JSON.stringify({
                username: user.email,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            }),
            { headers: headers }
        )
        .map(response => response.json())
        .do(data => {
            console.log(data);
            if(data.token){
                setString('token', data.token);
            }
        })
        .catch(this.handleErrors);
    }

    check() {
        let headers = new Headers(),
            token = getString('token');


        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");

        console.log(Config.apiUrl + "auth-check");

        return this._http.post(
            Config.apiUrl + "auth-check",
            '',
            { headers: headers }
            )
            .map(response => response.json())
            .do(data => {
                console.log(data);
            })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}