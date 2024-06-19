import { Component, OnInit, inject } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { Product } from '../../datamodels';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  private sharedata = inject(SharedDataService)
  constructor() { }

  ngOnInit(): void {
    this.cart = this.sharedata.cart;
    if (this.cart.length === 0) {
      const localStorageCartString = localStorage.getItem("cart");
      if (localStorageCartString) {
        try {
          const localStorageCart: Product[] = JSON.parse(localStorageCartString);
          this.cart = localStorageCart;
        } catch (error) {
          console.error('Error parsing localStorage data:', error);
        }
      }
    }
  }

  removeFromCart(product: Product): void {
    const index = this.cart.indexOf(product);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  getTotal(): number {
    return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }
  increaseQuantity(product: Product): void {
    product.quantity += 1;
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      this.removeFromCart(product);
    }
  }

}
