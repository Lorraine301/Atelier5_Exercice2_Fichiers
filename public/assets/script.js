const API_URL = "http://127.0.0.1:8000/api";

// Fonction pour uploader un fichier
async function uploadFile(event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("Veuillez sélectionner un fichier !");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert("Fichier uploadé avec succès !");
            getFiles(); // Rafraîchir la liste
        } else {
            alert("Erreur : " + data.message);
        }
    } catch (error) {
        console.error("Erreur lors de l'upload :", error);
    }
}

// Fonction pour récupérer et afficher la liste des fichiers
async function getFiles() {
    try {
        const response = await fetch(`${API_URL}/files`);
        const data = await response.json();

        if (response.ok) {
            const fileList = document.getElementById("fileList");
            fileList.innerHTML = "";

            data.files.forEach(file => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="http://127.0.0.1:8000/storage/${file}" target="_blank">${file}</a>`;
                fileList.appendChild(listItem);
            });
        } else {
            alert("Erreur : " + data.message);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
    }
}

// Ajouter un écouteur d'événements pour le formulaire
document.getElementById("uploadForm").addEventListener("submit", uploadFile);

// Charger les fichiers au démarrage
window.onload = getFiles;
