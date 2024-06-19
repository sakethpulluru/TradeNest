import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductViewComponent } from './home/product-view/product-view.component';
import { Title } from '@angular/platform-browser';
import { CartComponent } from './home/cart/cart.component';
import { ProfileComponent } from './header/profile/profile.component';
import { EditProfileComponent } from './header/profile/editprofile/editprofile.component';
import { EditAddressComponent } from './header/profile/editaddress/editaddress.component';
import { AddProductComponent } from './header/profile/addnewproduct/addnewproduct.component';
import { ABoutUsComponent } from './about-us/about-us.component';
import { TermsandConComponent } from './termsand-con/termsand-con.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:"Home"
    },
    {
      path:'login',
      component:LoginComponent,
      title:"Login"
    },
    {
        path:'signup',
        component:SignupComponent,
        title:"Sign up"
    },
    {
      path:'viewproduct/:id',
      component:ProductViewComponent,
    },
    {
      path:"home/:username/:id",
      component:HomeComponent,
      data : {
        title:"Home"
      }
    },
    {
      path:"cart",
      component:CartComponent,
      title:"Your Cart"
    },
    {
      path:"home",
      component:HomeComponent,
      title:"Home"
    },
    {
      path:"profile",
      component:ProfileComponent,
      title:"Profile"
    },
    {
      path:"editprofile",
      component:EditProfileComponent,
    },
    {
      path:"editaddress",
      component:EditAddressComponent
    },{
      path:"AddNewProduct",
      component:AddProductComponent,
      title:"Add a New Product"
    },{
      path:"aboutus",
      component:ABoutUsComponent,
      title:"About US",
    },{
      path:"tandc",
      component:TermsandConComponent,
      title:"Terms And Conditions"
    }
];
