


document.addEventListener('DOMContentLoaded', () => {

    // Sélection des boutons pour découvrir les cours et la préparation du popover
    const discoverButtons = document.querySelectorAll('.discover-course');
    const popover = document.getElementById('coursePopover');
 
    discoverButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
 
        const card = button.closest('.card');
        const cardRect = card.getBoundingClientRect();
        const carouselRect = document.getElementById('heroCarousel').getBoundingClientRect();
 
        // Positionnement  à droite de la carte
        popover.style.left = `${cardRect.right - carouselRect.left}px`;
        popover.style.top = `${cardRect.top - carouselRect.top}px`;
 
        // Gestion de l'affichage du popover
        const isVisible = popover.style.display === 'block';
        popover.style.display = isVisible ? 'none' : 'block';
        popover.innerHTML = isVisible ? '' : getPopoverContent(button.dataset.course);
      });
    });
 
    // Fermeture du popover en cliquant en dehors
    window.addEventListener('click', (event) => {
      if (!popover.contains(event.target) && !event.target.classList.contains('discover-course')) {
        popover.style.display = 'none';
      }
    });
 
   // la mise à jour du compteur de panier
    updateCartCounter();
  });
 
 
  function getPopoverContent(course) {
   
    let content = '';
    switch (course) {
      case "javaScript":
        content = `
          <div>
            <h4>JavaScript Avancé</h4>
            <p>Devenez un pro de JavaScript avec notre cours tutoriel avancé. Découvrez des stratégies de développement avancées et bien plus encore !</p>
            <p><strong>Durée:</strong> 16 heures au total</p>
            <p><strong>Niveau:</strong> Intermédiaire</p>
            <p><a href="javascript:void(0);" class="btn btn-primary enroll" onclick="addToCart('javascript', 'JavaScript Avancé', '150.50', '/public/photos/python8jpg.jpg')">Ajouter au Panier</a></p>
          </div>`;
        break;
     
      default:
        content = '<div>Information non disponible.</div>';
    }
    return content;
  }
 
  // Ajout d'un cours au panier et mise à jour du local storage
  function addToCart(courseId, courseTitle, coursePrice, courseImage) {
    let cart = JSON.parse(localStorage.getItem('coursPromotion')) || [];
    const courseExists = cart.some(course => course.id === courseId);
 
    if (!courseExists) {
      cart.push({ id: courseId, titre: courseTitle, prix: coursePrice, image: courseImage });
      localStorage.setItem('coursPromotion', JSON.stringify(cart));
      alert("Cours ajouté au panier !");

    } else {
      alert("Ce cours est déjà dans votre panier.");
    }
 
    updateCartCounter();
  }
 


// Mise à jour du compteur de panier
function updateCartCounter() {
    const cartPromotion = JSON.parse(localStorage.getItem('coursPromotion')) || [];
    const cartAchetes = JSON.parse(localStorage.getItem('coursAchetes')) || [];
    const totalItemCount = cartPromotion.length + Object.keys(cartAchetes).length;
    const cartCounterElement = document.getElementById('cartCounter');
    if (cartCounterElement) {
        cartCounterElement.textContent = totalItemCount;
    }
}

