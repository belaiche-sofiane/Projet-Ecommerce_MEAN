mongoimport --db ecommerceDatabase --collection produits --file Produits.json --jsonArray --drop
mongoimport --db ecommerceDatabase --collection membres --file membres.json --jsonArray --drop
mongoimport --db ecommerceDatabase --collection achat --file panier.json --jsonArray --drop

