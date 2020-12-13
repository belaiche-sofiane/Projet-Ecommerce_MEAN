
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req,res, next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'Get, POST, PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();

});

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    let db = client.db('ecommerceDatabase');
    
    app.get("/produits", (req, res) => {
        console.log("route:/produits");
        db.collection("produits").find().toArray((err, documents) => {
            res.end(JSON.stringify(documents));
        });
    });

    

    /* ajouter un produit dans la BD */
    app.post("/ajouterpanier", (req, res) => {
        console.log(JSON.stringify(req.body));
try{ 
        db.collection("achat").insertOne(req.body);
        res.end(JSON.stringify({ "message": "produit ajouté au panier" })); 
    }catch(e){
        console.log("Erreur  : " + e);
        res.end(JSON.stringify([]));// renvoie une liste vide
    }
    });
    
    /*supprimer un produit de la BD*/
    app.get("/produitsupp/:id", (req, res) => {
        console.log(JSON.stringify(req.body));

     try{
            db.collection("achat").remove({id:req.params.id} )  
            
            res.end(JSON.stringify({" resultat":1,"message":"Produit supprimé du panier "}));
        } catch(e){
            console.log("Erreur  : " + e);
            res.end(JSON.stringify([]));// renvoie une liste vide
        }
     });

     /*connexion d'un utilisateur*/
    app.post("/membre/connexion", (req,res) => {
        console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
        
    	try{
    		db.collection("membres").find(req.body).toArray((err, documents) => {
                console.log(documents);
    		 if (documents.length == 1){

             console.log("connecteee");
                 res.end(JSON.stringify({"resultat":1,"message":"authentification reussie "}));
             }
             else res.end(JSON.stringify({"resultat":0,"message": "Email et/ou mot de pass incorrect"}));
             
    		});
    	}catch (e) {
            console.log("catch");
    		res.end(JSON.stringify({"resultat": 0, "message": e}));
    	}

    });
    /* liste des produits suivant une catégorie*/
    app.get("/produits/:type", (req, res) => {

        console.log("/produits/" + req.params.type);

        db.collection("produits").find({ "type": req.params.type }).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
        });
    }); 
        
        //renvoie toutes les categories:
        app.get("/categories", (req,res) => {
    	console.log("/categories");
    	categories = []
    	try {
    		db.collection("produits").find() .toArray((err, documents) => {
    			for(let doc of documents) {
    				if (! categories.includes(doc.type)) categories.push(doc.type);
    			}
    			console.log("renvoi de "+JSON.stringify(categories));
    			res.end(JSON.stringify(categories));
    		});
    	}catch(e){
    		console.log("Erreur sur /categories: "+ e);
    		res.end (JSON.stringify([]));
    	}

    });

    //renvoie le contenu du panier selon l'adresse email
      app.get("/panier/:email", (req,res) => {
        console.log("panier");
        try{
            db.collection("achat").find({email:req.params.email} ).toArray((err, documents) => {
            res.end(JSON.stringify(documents));
           });
        }catch(e){
            console.log("Erreur sur /panier : " + e);
            res.end(JSON.stringify([]));// renvoie une liste vide
        }
     });
     //produit par categorie
     app.get("/produits/:categorie", (req,res) =>{
    	let categorie = req.params.categorie;
    	console.log("/produits/"+categorie);
    	try{
    	   db.collection("produits").find({type:categorie}).toArray((err, documents) =>{
    	   	res.end(JSON.stringify(documents));
    	   });
    	}catch(e) {;
    	console.log("erreur sur /produits/"+categorie+" : "+e);
    	res.end(JSON.stringify([]));
        }
   });
       // Ajouter un utilisteur 
    app.post("/membre", (req,res)=>{
        console.log("body:"+ JSON.stringify(req.body));
        try{
            db.collection("membres")
            .insert(req.body);
           res.end(JSON.stringify({"resultat": 1, "message": "compte creé"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }

    }); 
          
    
    
});

app.listen(8888);
