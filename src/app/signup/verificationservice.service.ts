import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificationserviceService {

  constructor() { }

  verifyEmail(email: string): boolean {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  verifyPassword(password: string): boolean {
    // Example: Password should be at least 8 characters long
    return password.length >= 8;
  }

  // Implement verification methods for other fields like conform password, user type, address, city, state, postal code, country, etc.

}