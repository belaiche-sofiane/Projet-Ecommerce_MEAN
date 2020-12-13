import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({
		"Access-Control-Allow-Methods":"GET, POST",
		"Access-Control-Allow-Headers":"Content-type",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin":"*",
		
	})
};
@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
urlBase: string = 'http://localhost:8888/';
 
  constructor(private http:HttpClient) { 
    
  }
  
  
  getProduits(): Observable<any> {
  let url = this.urlBase + 'produits';
  console.log("dans le service ProduitService avec " + url);
  return this.http.get(url);
  }
  getCategories(): Observable<any>{
    return this.http.get(this.urlBase+'categories');
    }
    getProduitsParCategorie(categorie): Observable<any>{
      return this.http.get(this.urlBase+'produits/'+categorie);
      } 
      getPanier(user): Observable<any>{
        
        return this.http.get(this.urlBase + 'panier/' + user)
      } 
      AjouterAuPanier(produit): Observable<any>{
        return this.http.post('http://localhost:8888/ajouterpanier',JSON.stringify(produit) ,httpOptions);
      }
      SupprimerProduit(produit){
        return this.http.get('http://localhost:8888/produitsupp/'+ produit);
      }
     
}
