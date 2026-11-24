// Tableau des employés
        let employes = [];

        // Fonction ajouter
        function ajouter() {

            let matricule = document.getElementById("matricule").value;
            let nom = document.getElementById("nom").value;
            let prenom = document.getElementById("prenom").value;
            let salaire = Number(document.getElementById("salaire").value);

            // Vérifier les champs
            if (matricule === "" || nom === "" ||
                prenom === "" || document.getElementById("salaire").value === "") {

                alert("Remplir tous les champs !");
                return;
            }

            if (salaire < 0) {
                alert("Le salaire doit être positif !");
                return;
            }

            // Vérifier le matricule
            let existe = employes.find(e => e.matricule === matricule);

            if (existe) {
                alert("Ce matricule existe déjà !");
                return;
            }

            // Créer un employé
            let employe = {
                matricule: matricule,
                nom: nom,
                prenom: prenom,
                salaire: salaire
            };

            // Ajouter dans le tableau
            employes.push(employe);

            // Actualiser l'affichage
            afficher();

            // Vider les champs
            document.getElementById("matricule").value = "";
            document.getElementById("nom").value = "";
            document.getElementById("prenom").value = "";
            document.getElementById("salaire").value = "";

        }

        // Fonction afficher
        function afficher() {

            let liste = document.getElementById("liste");

            liste.innerHTML = "";

            employes.forEach(function(e) {

                let ligne = document.createElement("tr");

                let valeurs = [
                    e.matricule,
                    e.nom,
                    e.prenom,
                    e.salaire + " DH"
                ];

                valeurs.forEach(function(valeur) {
                    let cellule = document.createElement("td");
                    cellule.textContent = valeur;
                    ligne.appendChild(cellule);
                });

                let celluleAction = document.createElement("td");

                let bouton = document.createElement("button");
                bouton.textContent = "Supprimer";

                bouton.onclick = function() {
                    supprimer(e.matricule);
                };

                celluleAction.appendChild(bouton);
                ligne.appendChild(celluleAction);

                liste.appendChild(ligne);

            });

            calculerMoyenne();
            salaireMaximum();

        }

        // Fonction supprimer
        function supprimer(matricule) {

            employes = employes.filter(e => e.matricule !== matricule);

            afficher();

        }

        // Calculer le salaire moyen
        function calculerMoyenne() {

            let somme = 0;

            employes.forEach(function(e) {
                somme = somme + e.salaire;
            });

            let moyenne = 0;

            if (employes.length > 0) {
                moyenne = somme / employes.length;
            }

            document.getElementById("moyenne").textContent =
                "Salaire moyen : " + moyenne.toFixed(2) + " DH";

        }

        // Trouver le salaire maximum
        function salaireMaximum() {

            if (employes.length === 0) {

                document.getElementById("maximum").textContent =
                    "Salaire maximum : Aucun employé";

                return;
            }

            let max = employes[0];

            employes.forEach(function(e) {

                if (e.salaire > max.salaire) {
                    max = e;
                }

            });

            document.getElementById("maximum").textContent =
                "Employé avec le salaire le plus élevé : " +
                max.nom + " " + max.prenom +
                " (" + max.salaire + " DH)";

        }
