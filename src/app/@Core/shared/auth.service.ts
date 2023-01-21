import { Injectable } from '@angular/core';
import { LocalStorage } from 'src/app/utconstant/LocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localstorage: LocalStorage
  ) { }

  IsLoggedIn() {
    return !!this.localstorage.get('token')
  }
} 
