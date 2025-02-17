import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SecureIDService {
  constructor() {}

  getSecureID() {
    return crypto.randomUUID().slice(0, 5);
  }
}
