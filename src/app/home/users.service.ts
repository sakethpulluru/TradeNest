import { Injectable } from '@angular/core';
import { User } from '../datamodels';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch("https://dummyjson.com/users");
      if (!response.ok) {
        throw new Error('Failed to fetch users: ' + response.status + ' ' + response.statusText);
      }
      const data = await response.json();
      const users = data.users.map((userJson: any) => User.fromJson(userJson));
      const localStorageUsers: User[] = JSON.parse(localStorage.getItem("users") || '[]');
      users.push(...localStorageUsers);
      return users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }


  async doesUserExist(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.getUsers();
      return users.some(user => (user.username === username || user.email === username) && user.password === password);
    } catch (error) {
      console.error('Invalid User', error);
      throw error;
    }
  }

  async getUserData(username: string, password: string): Promise<User> {
    try {
      const users = await this.getUsers();
      const foundUser = users.find(user => (user.username === username || user.email === username) && user.password === password);
      if (foundUser) {
        return foundUser;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Failed to get user data:', error);
      throw error;
    }
  }

  async getUserDataById(username: string, id: number): Promise<User> {
    try {
      const users = await this.getUsers();
      const foundUser = users.find(user => (user.username === username || user.email === username) && user.id === id);
      if (foundUser) {
        return foundUser;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Failed to get user data by ID:', error);
      throw error;
    }
  }

  async createUser(username: string, email: string, password: string, address: string, city: string, state: string, postcode: string, country: string): Promise<User> {
    try {
      const users = await this.getUsers();
      const id = users.length + 1; // Generate a new id based on the length of the users array
      const postalCode=postcode
      const newUser = new User(username, password, email, id,{ address, city, state, postalCode, country});
      const localStorageUsers: User[] = JSON.parse(localStorage.getItem("users") || '[]');
      localStorageUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(localStorageUsers));

      console.log(`${newUser.username} created`);
      console.log(await this.getUsers()); // Log updated users list
      return newUser;
    } catch (error) {
      console.error('Cannot create new user:', error);
      throw error;
    }
  }
}
