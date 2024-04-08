
const prixSynchrone = 100;

function createCartCounter(totalItems) {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCounter = document.createElement('div');
    cartCounter.id = 'cartCounter';
    cartCounter.className = 'badge rounded-pill bg-danger';
    cartCounter.innerText = totalItems.toString();
    cartItemsDiv.appendChild(cartCounter);
}


// Fonction pour supprimer un cours du panier
function removeFromCart(courseId) {
    let cartAchetes = JSON.parse(localStorage.getItem('coursAchetes')) || {};
    
    // Parcourir chaque cours dans le panier
    for (let key in cartAchetes) {
        // Vérifier si l'id du cours correspond à courseId
        if (cartAchetes[key].id === courseId) {
            // Supprimer le cours du panier
            delete cartAchetes[key];
            
            // Réenregistrer le panier mis à jour dans le localStorage
            localStorage.setItem('coursAchetes', JSON.stringify(cartAchetes));
            
            // Mettre à jour l'affichage du panier et le compteur du panier
            displayCartItems();
            updateCartCounter();
            return; // Sortir de la boucle une fois que le cours est trouvé et supprimé
        }
    }
     // Parcourir chaque cours dans le panier de promotion
     let cartPromotion = JSON.parse(localStorage.getItem('coursPromotion')) || [];
     for (let i = 0; i < cartPromotion.length; i++) {
         // Vérifier si l'id du cours correspond à courseId
         if (cartPromotion[i].id === courseId) {
             // Supprimer le cours du panier de promotion
             cartPromotion.splice(i, 1);
             
             // Réenregistrer le panier de promotion mis à jour dans le localStorage
             localStorage.setItem('coursPromotion', JSON.stringify(cartPromotion));
             
             // Mettre à jour l'affichage du panier et le compteur du panier
             displayCartItems();
             updateCartCounter();
             return; // Sortir de la boucle une fois que le cours est trouvé et supprimé
         }
     }
     
    console.log("Le cours que vous essayez de supprimer n'existe pas dans le panier.");
}




// Fonction pour afficher les éléments du panier
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return; // S'assurer que l'élément existe avant de continuer

    let htmlContent = "";
    let subtotal = 0;

    // Récupérer les données du localStorage à partir de la clé 'coursPromotion' et 'coursAchetes'
    const contenuLocalStoragePromotion = localStorage.getItem('coursPromotion');
    const contenuLocalStorageCoursAchetes = localStorage.getItem('coursAchetes');

    // Vérifier si des données sont présentes dans le localStorage à partir de la clé 'coursPromotion'
    if (contenuLocalStoragePromotion) {
        const cartPromotion = JSON.parse(contenuLocalStoragePromotion);
        for (const item of cartPromotion) {
            htmlContent += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${item.titre} </strong></h5>
                        <img src="${item.image}" alt="${item.titre}" style="width: 100px; height: auto;">
                        <div id="promoIndicator" style="background: linear-gradient(to right, violet, pink); color: white; padding: 5px; display: inline-block; border: none; border-radius: 7px;">PROMO</div>
                        <p class="card-text">Prix: ${item.prix} CA$</p>
                        <button class="remove-course" onclick="removeFromCart('${item.id}')" style="background-color:  #ff6666; color: white; border: none; border-radius: 1px; cursor: pointer;">Retirer</button> 
                    </div>
                </div>`;
            subtotal += parseFloat(item.prix); // Ajouter le prix de chaque cours au sous-total
        }
    }

    // Vérifier si des données sont présentes dans le localStorage à partir de la clé 'coursAchetes'
    if (contenuLocalStorageCoursAchetes) {
        const coursAchetes = JSON.parse(contenuLocalStorageCoursAchetes);
        for (const cours in coursAchetes) {
            const item = coursAchetes[cours];
            // Utiliser le prixSynchrone pour les cours synchrones et récupérer le prix pour les cours asynchrones
            const prix = item.prix ? item.prix : prixSynchrone;
            htmlContent += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${cours}</h5>
                        <img src="${item.image}" alt="${cours}" style="width: 100px; height: auto;">
                        <p class="card-text">Prix: ${prix} CA$</p>
                        <button class="remove-course" onclick="removeFromCart('${item.id}')" style="background-color:  #ff6666; color: white; border: none; border-radius: 1px; cursor: pointer;">Retirer</button> 
                    </div>
                </div>`;
            subtotal += parseFloat(prix); // Ajouter le prix de chaque cours au sous-total
        }
    }

    // Affichage du contenu dans le conteneur
    cartItemsContainer.innerHTML = htmlContent;
    document.getElementById("subtotal").textContent = `${subtotal} CA$`; // Affichage du sous-total
}










function updateCartCounter() {
    // Récupérer les articles depuis le Local Storage
    const cartPromotion = JSON.parse(localStorage.getItem('coursPromotion')) || [];
    const cartAchetes = JSON.parse(localStorage.getItem('coursAchetes')) || {};

    console.log("Contenu de cartPromotion :", cartPromotion);
    console.log("Contenu de cartAchetes :", cartAchetes);

    // Calculer le nombre total d'articles
    const totalItemCount = cartPromotion.length + Object.keys(cartAchetes).length;

    console.log("Total d'articles :", totalItemCount);

    // Mettre à jour le contenu de la div count du panier avec le nombre total d'articles
    document.getElementById('cartCounter').innerText = totalItemCount;
}

// Attendre que le DOM soit entièrement chargé
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    displayCartItems(); // Initialiser l'affichage des éléments du panier
});

document.addEventListener('DOMContentLoaded', function() {
    // Cibler le lien "Valider"
    const checkoutButton = document.getElementById('checkout-button');

    // Ajouter un écouteur d'événements au clic sur le lien "Valider"
    checkoutButton.addEventListener('click', function(event) {
        // Récupérer le prix total depuis la page actuelle
        const totalPrice = parseFloat(document.getElementById('subtotal').textContent);

        // Construire l'URL de la page de paiement avec le prix total comme paramètre
        const paymentPageURL = "/public/HTML/paiement.html?totalPrice=" + totalPrice;

        // Rediriger vers la page de paiement avec le prix total comme paramètre
        window.location.href = paymentPageURL;

        // Empêcher le comportement par défaut du lien (navigation)
        event.preventDefault();
    });

