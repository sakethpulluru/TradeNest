import { Component } from '@angular/core';
import { ProductService } from '../../../home/product.service.service';
import { Router } from '@angular/router';
import { Product } from '../../../datamodels';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addnewproduct',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addnewproduct.component.html',
  styleUrl: './addnewproduct.component.css'
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    rating: 0,
    brand: '',
    stock: 0,
    quantity: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.productService.addProduct(this.product);
    console.log('Product added:', this.product);
    this.router.navigate(['/home']);
  }
}
