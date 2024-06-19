import { Component, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../../datamodels';
import { ProductService } from '../product.service.service';
import { SharedDataService } from '../../shared-data.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  product!: Product;
  private sharedata=inject(SharedDataService);
  constructor(private route: ActivatedRoute, private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProducts().then(products => {
        this.product = products.find(p => p.id === +productId) as Product;
      });
    }
  }
  isProductInCart(): boolean {
    return this.sharedata.cart.some(cartProduct => cartProduct.id === this.product.id);
  }

  getProductQuantity(): number {
    const cartProduct = this.sharedata.cart.find(cartProduct => cartProduct.id === this.product.id);
    return cartProduct ? cartProduct.quantity : 0;
  }

  addToCart(): void {
    const cartProduct = this.sharedata.cart.find(cartProduct => cartProduct.id === this.product.id);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      this.sharedata.cart.push({ ...this.product, quantity: 1 });
    }
    console.log(this.sharedata.cart);
  }

  removeFromCart(): void {
    const cartProduct = this.sharedata.cart.find(cartProduct => cartProduct.id === this.product.id);
    if (cartProduct) {
      if (cartProduct.quantity > 1) {
        cartProduct.quantity -= 1;
      } else {
        const index = this.sharedata.cart.indexOf(cartProduct);
        if (index > -1) {
          this.sharedata.cart.splice(index, 1);
        }
      }
    }
    console.log(this.sharedata.cart);
  }
  renderToCart(){
    this.router.navigate(["/cart"]);
  }
}
