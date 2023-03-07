// Class permettant de créer les templates HTML des DropdownBox
// Elle prends en paramètres les infos correspondants (id, color, type)
export default class DropdownBox {
  constructor(id, color, type) {
    this.id = id;
    this.color = color;
    this.type = type;
  }

  // Methode en charge de la création du template HTML correspondant à chq DropdownBox avec les paramètres correspondant
  createdropdownbox() {
    const templateDropdownBox = `
    <button class="dropdownbox-btn ${this.color}" id="dropdownbox-btn-${this.id}">
      ${this.type}s
      <i class="fas fa-chevron-down"></i>
    </button>
    <div class="dropdownbox-container hidden" id="dropdownbox-container-${this.id}">
      <form action="" method="" class="dropdownbox-form">
        <input
          class="dropdownbox-input ${this.color}"
          id="dropdownbox-input-${this.id}"
          type="text"
          placeholder="Rechercher un ${this.type.toLowerCase()}"
        />
        <span class="dropdownbox-input-icon">
          <i class="fas fa-chevron-up"></i>
        </span>
      </form>
      <ul class="dropdownbox-list ${this.color}" id="dropdownbox-list-${this.id}">
      </ul>
    </div>
    `;

    return templateDropdownBox;
  }
}
