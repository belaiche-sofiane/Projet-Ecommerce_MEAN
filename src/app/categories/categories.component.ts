import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../produits.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Object[];
   
    user: Subject<string>;
  constructor(private produitsService: ProduitsService, private router:Router, private authService: AuthentificationService) {
    this.user= this.authService.getUser();
   }

  ngOnInit(){
   
    this.produitsService.getCategories().subscribe(categories=>{
    this.categories = categories;
  });
}
produitsParCategorie(categorie) {
  this.router.navigate(['/produits',categorie]);
}



 
}

