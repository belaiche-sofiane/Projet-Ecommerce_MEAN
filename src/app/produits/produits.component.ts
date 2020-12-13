import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Observable, Subject,BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
	//  user : Observable<string>; 
 produits: Object[] = new Array();
 product: Object[] = new Array() ;
 message: String="";
 user : Subject<String>;

produit;
  constructor(private route: ActivatedRoute, private router: Router,
				private authService: AuthentificationService,
				private produitsService: ProduitsService
				) { 
					this.produit = this.produitsService.getProduits()
					this.user= this.authService.getUser();
				
				}

  ngOnInit() {
	this.route.params.subscribe((params : Params) =>{
	
		console.log("Dans produits.component.ts avec "+params["categorie"]);
		if(params["categorie"] !== undefined){
			console.log("/produits/"+params['categorie']);
			this.produitsService.getProduitsParCategorie(params["categorie"]).subscribe(produits=>{
				this.produits = produits;
			});
		}
		else{
			this.produitsService.getProduits().subscribe(produits => {
				this.produits = produits;
			});
		}
	});
  
}

ajoutpanier(produit){
	let produitAjoute = {
		email: this.user['_value'],
		id: Math.random().toString(36).substr(2, 9),
		nom: produit['nom'],
		type: produit['type'],
		photo: produit['photo'],
		Prix: produit['Prix'],
	  };
	  this.produitsService.AjouterAuPanier(produitAjoute).subscribe((resultats) => {
		this.message = resultats['message'] 
	  })
	
}

  	
}
