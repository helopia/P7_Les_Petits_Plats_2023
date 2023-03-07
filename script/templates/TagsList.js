// Class en charge de créer les éléments HTML <li> pour chq catégorie de tag
// Le constructeur prends en paramètre la liste des tags, l'id et la liste des tags déjà selectionnés

export default class TagsList {
  constructor(allElements, id, selectedTags) {
    this.allElements = allElements;
    this.id = id;
    this.selectedTags = selectedTags;
  }

  // Methode pour convertir les datas en éléments <li> via une loop for
  getdropdownboxList() {
    let dropdownboxItemsList = ``;
    // Si la liste de tag selectionnés est vide, création des <li> sur le modèle du template ci-dessous
    if (!this.selectedTags.length) {
      // console.log(this.allElements);
      for (let i = 0; i < this.allElements.length; i += 1) {
        // console.log(this.allElements[i]);
        let li = document.createElement("li");

        li = `
          <li class="dropdownbox-list-item dropdownbox-list-item-${this.id}">${this.allElements[i]}</li>
          `;

        dropdownboxItemsList += li;
      }
    } else {
      // Si la liste de tag selectionnés contient des éléments
      // Et que l'un de ces éléments est le même que celui contenu dans un <li>
      // On cache l'élément <li> avec la class CSS "hide"
      for (let i = 0; i < this.allElements.length; i += 1) {
        let li = document.createElement("li");

        if (
          this.selectedTags
            .join(" ")
            .toLowerCase()
            .includes(this.allElements[i].toLowerCase())
        ) {
          li = `
           <li class="dropdownbox-list-item dropdownbox-list-item-${this.id} hide">${this.allElements[i]}</li>
           `;

          dropdownboxItemsList += li;
        } else {
          li = `
          <li class="dropdownbox-list-item dropdownbox-list-item-${this.id}">${this.allElements[i]}</li>
          `;

          dropdownboxItemsList += li;
        }
      }
    }
    return dropdownboxItemsList;
  }
}
