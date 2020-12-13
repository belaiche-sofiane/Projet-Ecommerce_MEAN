import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';

    
   
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
product: String[];
message:string="" 
   user: Observable<string>;
  panier;

variable: number; 
  constructor( 
    private authService: AuthentificationService,
    private produitsService: ProduitsService,
    private router: Router) {

      this.user = this.authService.getUser();   }

  ngOnInit() {
   this.produitsService.getPanier(this.user['_value'] ).subscribe(panier =>{
     this.panier = panier;
   } )
  }

Supprimer(produit){
	this.produitsService.SupprimerProduit(produit).subscribe(produit=>{
	  this.message = produit['message'];
      this.produitsService.getPanier(this.user['_value']).subscribe(
        (panier) => {
          this.panier = panier;
          
        }
      );

	} )
	
	
 }
 augmentationQuantite(v){
  let b = 0;
  this.panier.push(v)
  for(let i in this.panier){
  if(this.panier[i] === v){
    
    b++;
    this.variable = b; 
  }
} 
} 

}






