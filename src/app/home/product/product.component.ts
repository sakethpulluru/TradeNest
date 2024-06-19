import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Product } from '../../datamodels';
import { SharedDataService } from '../../shared-data.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf,DialogComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Output() onview=new EventEmitter<Product>()
  @Input({required:true}) product!:Product;
  notLogedin=true;
  onView(){
    this.onview.emit(this.product);
  }
  private shareddata=inject(SharedDataService);
  constructor(private router : Router){}
  isProductInCart(): boolean {
    return this.shareddata.cart.some(cartProduct => cartProduct.id === this.product.id);
  }

  getProductQuantity(): number {
    const cartProduct = this.shareddata.cart.find(cartProduct => cartProduct.id === this.product.id);
    return cartProduct ? cartProduct.quantity : 0;
  }

  addToCart(): void {
    if(!localStorage.getItem("currentuser")){
        this.router.navigate(["/login"]);
        this.notLogedin=false;
      }
    const cartProduct = this.shareddata.cart.find(cartProduct => cartProduct.id === this.product.id);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      this.shareddata.cart.push({ ...this.product, quantity: 1 });
      localStorage.setItem("cart",JSON.stringify(this.shareddata.cart));
    }
    console.log(this.shareddata.cart);
  }

  removeFromCart(): void {
    const cartProduct = this.shareddata.cart.find(cartProduct => cartProduct.id === this.product.id);
    if (cartProduct) {
      if (cartProduct.quantity > 1) {
        cartProduct.quantity -= 1;
      } else {
        const index = this.shareddata.cart.indexOf(cartProduct);
        if (index > -1) {
          this.shareddata.cart.splice(index, 1);
        }
      }
    }
    console.log(this.shareddata.cart);
  }
  close(){
    this.notLogedin=true;
  }
}
