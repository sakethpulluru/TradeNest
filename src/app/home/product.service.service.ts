import { Injectable } from '@angular/core';
import { Product } from '../datamodels';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor() { }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      const products = data.products.map((productJson: any) => Product.fromJson(productJson));
      console.log(products)
      const localStorageProducts = JSON.parse(localStorage.getItem('products') || '[]');
      if (localStorageProducts && localStorageProducts.length > 0) {
        return localStorageProducts; // Return products from localStorage if available
      } else {
        return products; // Return products fetched from the API
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiUrl}/category-list`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      const categories: string[] = data.map((category: any) => category.toLowerCase());
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async addProduct(product: Product): Promise<void> {
    try {
      const products = await this.getProducts();
      product.id = products.length ? products[products.length - 1].id + 1 : 1; // Assign a new id

      // Update the array of products
      products.push(product);

      // Store the updated products array back into localStorage
      localStorage.setItem('products', JSON.stringify(products));

      console.log('Product added successfully:', product);
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  }
  async getProductByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      const productsFromApi = data.products.map((productJson: any) => Product.fromJson(productJson));

      const localStorageProducts = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
      const filteredLocalProducts = localStorageProducts.filter(product => product.category === category);
      const mergedProducts = [...productsFromApi, ...filteredLocalProducts];

      return mergedProducts;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

}
