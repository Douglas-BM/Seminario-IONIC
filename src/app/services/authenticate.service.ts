import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  loginUser(credentials) {
    return new Promise((accept, reject) => {
      this.storage.get("user").then((data) => {
        if (
          credentials.email == data.email && 
          credentials.password == atob(data.password)
        ) {
          accept("Login Exitoso");
        } else {
          reject("Login Fallido");
        }
      }).catch( err => {
        return reject("Fallo en el Login")
      });
    });
  }

  registerUser(userData) {
    userData.password = btoa(userData.password);
    //atob() funcion para desencriptar
    return this.storage.set("user", userData)
  }

}
