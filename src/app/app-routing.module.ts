import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {ProduitsComponent }  from './produits/produits.component';
import {ConnexionComponent} from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MenuComponent } from './menu/menu.component';
import { PanierComponent } from './panier/panier.component';
import {AccueilComponent }  from './accueil/accueil.component';



const routes: Routes = [
 
  { path:'produits/:categorie', component:ProduitsComponent} ,
 { path:'produits',component:ProduitsComponent},
 {path: 'categories',component: CategoriesComponent},
 {path:'membre/connexion', component: ConnexionComponent},
{path:'inscription',component:InscriptionComponent},
{path: 'panier/:email', component:PanierComponent},
{path:'accueil', component:AccueilComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
