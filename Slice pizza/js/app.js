let panierTexte = document.querySelector(".cart-value")
let listeProduits = document.querySelector(".basket-products")
let panierVide = document.querySelector(".empty-basket")
let panierFull = document.querySelector(".full-basket")

let nombreArticles = 0
let TotalPrix = 0

panierTexte.textContent = "Votre panier (" + nombreArticles + ")"

async function demarrer() {
    const resultat = await fetch('http://51.38.232.174:3001/products', {
        method: 'GET',
        headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvdG9AZXhhbXBsZS5jb20iLCJzdWIiOiJjMWQxZDgyOC0xOGMyLTQ0MDctYjc5OC02ZTdjYjY0MDY3ZmQiLCJpYXQiOjE3NDUzOTI2MDAsImV4cCI6MTc0NTQ3OTAwMH0.u97V9q_h2MI58bJ-pxa-kr_tGM_k3xcybBY9Uz89Z8A',
            'Content-Type': 'application/json',
        }
    });

    const produits = await resultat.json();
    console.log(produits);

    for (let j = 0; j < produits.length; j++) {
        let conteneurPizzas = document.querySelector(".pizzas-wrapper")
        let elementPizza = document.createElement("div")
        elementPizza.className = "pizza-item"

        let imagePizza = document.createElement("img")
        imagePizza.className = "pizza-picture"
        imagePizza.src = produits[j].image
        imagePizza.alt = produits[j].name

        let boutonAjout = document.createElement("span")
        boutonAjout.className = "add-to-cart-btn"
        boutonAjout.textContent = "Ajouter au panier"

        let iconePanier = document.createElement("img")
        iconePanier.src = "../images/carbon_shopping-cart-plus.svg"
        iconePanier.alt = "logo-panier"

        let infosPizza = document.createElement("ul")
        infosPizza.className = "pizza-infos"

        let nomPizza = document.createElement("li")
        nomPizza.className = "pizza-name"
        nomPizza.textContent = produits[j].name

        let prixPizza = document.createElement("li")
        prixPizza.className = "pizza-price"
        prixPizza.textContent = "$" + produits[j].price

        conteneurPizzas.appendChild(elementPizza)
        elementPizza.appendChild(imagePizza)
        elementPizza.appendChild(boutonAjout)
        boutonAjout.appendChild(iconePanier)
        elementPizza.appendChild(infosPizza)
        infosPizza.appendChild(nomPizza)
        infosPizza.appendChild(prixPizza)

        boutonAjout.addEventListener("click", () => {
            console.log("Ajouté : " + produits[j].name)
            nombreArticles++;
            panierTexte.textContent = "Votre panier (" + nombreArticles + ")"

            let elementProduit = document.createElement("li")
            elementProduit.className = "basket-product-item"

            let titreProduit = document.createElement("span")
            titreProduit.classList = "basket-product-item-name"
            titreProduit.textContent = produits[j].name

            let detailsProduit = document.createElement("span")
            detailsProduit.className = "basket-product-details"

            let quantiteProduit = document.createElement("span")
            quantiteProduit.classList = "basket-product-details-quantity"
            quantiteProduit.textContent = ""

            let prixUnitaire = document.createElement("span")
            prixUnitaire.classList = "basket-product-details-unit-price"
            prixUnitaire.textContent = "@ $" + produits[j].price

            let prixTotal = document.createElement("span")
            prixTotal.classList = "basket-product-details-total-price"
            prixTotal.textContent = ""

            let croixSuppression = document.createElement("img")
            croixSuppression.classList = "basket-product-remove-icon"
            croixSuppression.src = "../images/remove-icon.svg"
            croixSuppression.alt = ""

            croixSuppression.addEventListener("click", () => {
                nombreArticles--;
                panierTexte.textContent = "Votre panier (" + nombreArticles + ")"
                elementProduit.remove()
            })

            let commandeTotale = document.createElement("p")
            commandeTotale.classList = "total-order"

            let titreCommande = document.createElement("span")
            titreCommande.classList = "total-order-title"
            titreCommande.textContent = "Order total"

            let prixCommande = document.createElement("span")
            prixCommande.classList = "total-order-price"
            prixCommande.innerHTML = totalPrix

            listeProduits.appendChild(elementProduit)
            elementProduit.appendChild(titreProduit)
            elementProduit.appendChild(detailsProduit)
            detailsProduit.appendChild(quantiteProduit)
            detailsProduit.appendChild(prixUnitaire)
            detailsProduit.appendChild(prixTotal)
            detailsProduit.appendChild(croixSuppression)
            commandeTotale.appendChild(titreCommande)
            commandeTotale.appendChild(prixCommande)

            if (nombreArticles >= 1) {
                panierVide.style.display = "none"
                panierAvecDesTrucs.style.display = "grid"
            } else if (nombreArticles <= 0) {
                panierVide.style.display = "grid"
                panierAvecDesTrucs.style.display = "none"
            }
        })
    }
}
demarrer()

window.addEventListener("load", () => {
    panierAvecDesTrucs.style.display = "none"
})
