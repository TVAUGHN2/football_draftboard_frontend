import { Injectable } from '@angular/core';
import { UserProfiles } from './data.model';

//server side function declared in server's index.html
declare const passEmail: any;
declare const passName: any;

@Injectable()
export class AuthService {
    userProfiles: UserProfiles = new UserProfiles();

    login(user: string, password: string): boolean {
        user = user.toUpperCase(); //optimization, so not calling toUpperCase for every profile
        var isValid: boolean;
        this.userProfiles.userProfiles.forEach(profile=> {
            //this assumes that usernames are unique and so if a user doesn't
            //enter the correct password for an username, it should stop immediately
            //rather than contining through other usernames
            if (user === profile["username"].toUpperCase()){
                if (password === profile["pwd"]){
                    
                    isValid = true;
                    return isValid;
                }
                isValid = false;
                return isValid;
            }
        });
        return isValid;
    }

    logout(): any {
        localStorage.removeItem('username');
        localStorage.removeItem('fname');
    }

    getUser(): any {
        var _user = passEmail();
        var _fname = passName();
        localStorage.setItem('username', _user);
        localStorage.setItem('fname', _fname);

        return { username: _user, 
                 fname: _fname
                };
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
