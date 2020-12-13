import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitsComponent } from './produits/produits.component';

import {AuthentificationService} from './authentification.service';
import {FormsModule }  from '@angular/forms'; 
import {HttpClientModule }  from '@angular/common/http';
import {ProduitsService }  from './produits.service';
import { MenuComponent } from './menu/menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PanierComponent } from './panier/panier.component';
import { AccueilComponent } from './accueil/accueil.component';



@NgModule({
  declarations: [
    AppComponent,
    ProduitsComponent,
    MenuComponent,
    CategoriesComponent,
    ConnexionComponent,
    InscriptionComponent,
    PanierComponent,
    AccueilComponent,
  
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProduitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
