// Class en charge des eventlisteners et des comportement des DropdownBox (ouverture, fermeture et un seul dropdownbox ouvert à la fois)
export default class Management {

  eventListenerdropdownbox() {
    const allBtnOpen = document.querySelectorAll(".dropdownbox-btn");
    const allBtnClose = document.querySelectorAll(".dropdownbox-input-icon");

    allBtnOpen.forEach((el) => {
      el.addEventListener("click", () => {
        this.alldropdownboxClosed();
        el.classList.add("hidden");
        el.nextElementSibling.classList.remove("hidden");

        // Comportement liè à la saisie ds l'input des DropdownBox
        const allLi = el.nextElementSibling.getElementsByTagName("li");
        Array.from(allLi).forEach((elt) => {
          elt.classList.remove("hidden");
        });
      });
    });

    allBtnClose.forEach((el) => {
      el.addEventListener("click", () => {
        el.parentElement.parentElement.classList.add("hidden");
        el.parentElement.parentElement.previousElementSibling.classList.remove(
          "hidden"
        );
        el.parentElement.reset();
      });
    });
  }

  // Methode en charge de fermer tout les DropdownBox, permet lors de l'ouverture d'un DropdownBox de tous les fermer dans un premier temps et d'éviter
  // D'avoir plusieurs DropdownBox ouvert en même temps
  alldropdownboxClosed() {
    const alldropdownbox = document.querySelectorAll(".dropdownbox-container");

    for (let i = 0; i < alldropdownbox.length; i += 1) {
      if (!alldropdownbox[i].classList.contains("hidden")) {
        alldropdownbox[i].classList.add("hidden");
        alldropdownbox[i].firstElementChild.reset();
        alldropdownbox[i].previousElementSibling.classList.remove("hidden");
      }
    }
  }
}
