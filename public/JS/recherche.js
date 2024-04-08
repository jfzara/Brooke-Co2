// URL globale pour l'API ou le fichier JSON
var url = 'coursJS.json';

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer les données JSON
    async function recupererDonneesJSON() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erreur de récupération des données.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur:', error);
            return [];
        }
    }

    function addCourseToDropdown(cours, dropdownMenu) {
        const lienElement = document.createElement('a');
        lienElement.textContent = cours.titre;
        lienElement.href = '#';
        lienElement.classList.add('dropdown-item');
        lienElement.dataset.id = cours.id; 
        lienElement.addEventListener('click', function(event) {
            event.preventDefault();
            afficherDetailsCours(cours.id);
        });
        dropdownMenu.appendChild(lienElement);
    }

    // Fonction pour afficher les détails du cours
    function afficherDetailsCours(idCours) {
		const detailsContainer = document.getElementById('detailsCoursContainer');
		detailsContainer.innerHTML = '';
		
		recupererDonneesJSON().then(data => {
		
			const allCours = [...data[0].coursAsynchrones.flatMap(mois => mois.cours), ...data[1].coursSynchrones.flatMap(mois => mois.cours)];
			const coursDetail = allCours.find(cours => cours.id === idCours);
			if (coursDetail) {
				const titre = document.createElement('h3');
				titre.textContent = coursDetail.titre;
				const description = document.createElement('p');
				description.textContent = coursDetail.description;
	
				// Ajout de l'image
const image = document.createElement('img');
image.src = coursDetail.image;
image.alt = coursDetail.titre;
image.classList.add('course-image');


image.style.width = '200px'; 
image.style.height = 'auto'; 

detailsContainer.appendChild(image)
	
				// Ajout du formateur
				const formateur = document.createElement('p');
				formateur.textContent = "Formateur: " + coursDetail.formateur;
				detailsContainer.appendChild(formateur);
	
				// Ajout du coût
				const cout = document.createElement('p');
				cout.textContent = "Coût: " + coursDetail.cout + " $";
				detailsContainer.appendChild(cout);
	
				// Ajout du titre et de la description
				detailsContainer.appendChild(titre);
				detailsContainer.appendChild(description);
				
				detailsContainer.style.display = 'block'; 
			}
		});
	}

   
    document.getElementById('searchButton').addEventListener('click', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        const dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu.innerHTML = ''; 

        if (searchTerm.length < 3) {
            alert('Veuillez saisir au minimum 3 lettres.');
            return;
        }

        recupererDonneesJSON().then(data => {
            let foundCours = false;

            const allCours = [...data[0].coursAsynchrones.flatMap(mois => mois.cours), ...data[1].coursSynchrones.flatMap(mois => mois.cours)];
            allCours.forEach(cours => {
                if (cours.titre.toLowerCase().includes(searchTerm)) {
                    foundCours = true;
                    addCourseToDropdown(cours, dropdownMenu);
                }
            });

            dropdownMenu.style.display = foundCours ? 'block' : 'none';
        });
    });

   
});
