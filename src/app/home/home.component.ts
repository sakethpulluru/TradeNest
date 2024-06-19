import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ProductService } from './product.service.service';
import { Product, User } from '../datamodels';
import { ProductComponent } from "./product/product.component";
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './users.service';
import { SharedDataService } from '../shared-data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ProductComponent, NgFor]
})
export class HomeComponent implements OnInit {
  username: string = '';
  userid: string = '';
  products: Product[] = [];
  chunkedProducts: Product[][] = [];
  categories: string[] = [];
  productsPerSlide: number = 10; // Default for small screens
  currentPage: number = 0;
  noOfChecked = 0;
  electronicItems = [
    "laptops",
    "smartphones",
    "tablets",
    "mobile-accessories"
  ];
  @ViewChild('productsCarousel') productsCarousel!: ElementRef<HTMLDivElement>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedData: SharedDataService
  ) { }

  ngOnInit(): void {
    // Subscribe to getUser() to get the logged-in user data
    this.sharedData.getUser().subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.userid = user.id.toString();
        console.log(`Username: ${this.username}, ID: ${this.userid}`);
        this.fetchProducts(); // Fetch products when user is logged in
      }
    });

    // Fetch initial products and categories
    this.fetchProducts();
    this.fetchCategories();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateProductsPerSlide();
    this.chunkProducts();
  }

  async fetchProducts() {
    try {
      this.products = await this.productService.getProducts();
      this.chunkProducts(); // Chunk products after fetching
      console.log(`Number of products read: ${this.products}`);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }


  async fetchCategories() {
    try {
      this.categories = await this.productService.getCategories();
      console.log('Fetched categories:', this.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  updateProductsPerSlide(): void {
    const width = window.innerWidth;

    if (width >= 1200) {
      this.productsPerSlide = 45; // Extra large screens
    } else if (width >= 992) {
      this.productsPerSlide = 24; // Large screens
    } else if (width >= 768) {
      this.productsPerSlide = 18; // Medium screens
    } else {
      this.productsPerSlide = 10; // Small screens
    }
  }

  chunkProducts(): void {
    this.chunkedProducts = [];
    for (let i = 0; i < this.products.length; i += this.productsPerSlide) {
      this.chunkedProducts.push(this.products.slice(i, i + this.productsPerSlide));
    }
    this.currentPage = 0; // Reset current page when products are re-chunked
  }

  onProductSelected(product: Product) {
    this.router.navigate(['/viewproduct', product.id]);
  }

  get totalPages(): number {
    return this.chunkedProducts.length;
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.setActiveSlide(page);
    }
  }

  setActiveSlide(index: number): void {
    const carouselItems = this.productsCarousel.nativeElement.querySelectorAll('.carousel-item');
    carouselItems.forEach((item: Element, i: number) => {
      const htmlItem = item as HTMLElement;
      if (i === index) {
        htmlItem.classList.add('active');
      } else {
        htmlItem.classList.remove('active');
      }
    });
  }
  async onCategoryChange(category: string, event: any) {
    const isChecked = event.target.checked;

    try {
      if (isChecked) {
        this.noOfChecked++;
        if (this.noOfChecked === 1) {
          this.products = await this.productService.getProductByCategory(category);
        } else {
          const productsToAdd = await this.productService.getProductByCategory(category);
          this.products = [...this.products, ...productsToAdd];
        }
      } else {
        this.noOfChecked--;
        if (this.noOfChecked === 0) {
          this.products = await this.productService.getProducts();
        } else {
          this.products = this.products.filter(product => product.category !== category);
        }
      }
      this.chunkProducts();
      console.log(`Number of products: ${this.products.length}`);
    } catch (error) {
      console.error('Error fetching or updating products', error);
    }
  }

}
