import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './datamodels';
import { Product } from './datamodels';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private userSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  public cart: Product[] = [];

  constructor() { }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem("currentuser",JSON.stringify(user));
  }

  getUser(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  clearUser(): void {
    this.userSubject.next(undefined);
  }

  addToCart(product: Product): void {
    const cartProduct = this.cart.find(p => p.id === product.id);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }
  }

  removeFromCart(product: Product): void {
    const index = this.cart.indexOf(product);
    if (index > -1) {
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  isUserLogedin(): boolean {
    return !!this.userSubject.value;
  }
}
