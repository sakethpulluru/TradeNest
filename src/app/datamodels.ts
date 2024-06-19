import { retryWhen } from "rxjs";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  brand: string;
  stock: number;
  public quantity:number=0;
  constructor(id: string, name: string, description: string, price: string, imageUrl: string, category: string, rating: number, brand: string, stock: number) {
    this.id = parseInt(id);
    this.name = name;
    this.description = description;
    this.price = parseInt(price);
    this.imageUrl = imageUrl;
    this.category = category;
    this.rating = rating;
    this.brand = brand;
    this.stock = stock

  }
  static fromJson(json: any): Product {
    return new Product(
      json.id,
      json.title,
      json.description,
      json.price,
      json.thumbnail,
      json.category,
      json.rating,
      json.brand,
      json.stock
    );
  }
}

export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public id: number,
    public address: Address  // Change type to Address
  ) {}
  static fromJson(json: any): User {
    return new User(
      json.username,
      json.password,
      json.email,
      json.id,
      Address.fromJson(json.address)  // Use Address.fromJson to create Address object
    );
  }
}

export class Address {
  constructor(
    public address: string,
    public city: string,
    public state: string,
    public postalCode: string,
    public country: string
  ) {}

  static fromJson(json: any): Address {
    return new Address(
      json.address,
      json.city,
      json.state,
      json.postalCode,
      json.country
    );
  }
}

