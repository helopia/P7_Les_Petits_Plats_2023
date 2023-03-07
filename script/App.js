// Class en charge de centraliser et orchestrer l'ensemble des classes et leurs comportements.
import RecipesStates from "./models/RecipesState.js";
import Recipe from "./models/Recipe.js";
import RecipeCard from "./templates/RecipeCard.js";
import DropdownBox from "./templates/DropdownBox.js";
import ArrayGeneration from "./models/ArrayGeneration.js";
import SearchBar from "./templates/SearchBar.js";
import dropdownboxManagement from "./utils/dropdownboxManagement.js";
import SearchBarManagement from "./utils/SearchBarManagement.js";
import TagsList from "./templates/TagsList.js";
import dropdownboxInputManagement from "./utils/dropdownboxInputManagement.js";
import TagsManagement from "./utils/TagsManagement.js";

export default class App {
  constructor() {
    this.app = this;
    this.recipesSection = document.getElementById("main");
    this.dropdownboxIngredients = document.getElementById("dropdownbox-ingredients");
    this.dropdownboxUstensils = document.getElementById("dropdownbox-ustensils");
    this.dropdownboxAppliances = document.getElementById("dropdownbox-appliance");
    this.SearchBarSection = document.getElementById("search");
    this.recipesStates = new RecipesStates(this.app);
  }

  displayRecipes(data) {
    // Methode en charge de la création des éléments html-recette
    this.recipesSection.innerHTML = "";
    if (data.length > 0) {
      data
        // Transforme le tableau de données en se basant sur le modèle de la class Recipe
        .map((recipe) => new Recipe(recipe))
        // Création des cards recipe via la methode createRecipeCard de la class RecipeCard
        .forEach((recipe) => {
          const Template = new RecipeCard(recipe);
          this.recipesSection.innerHTML += Template.createRecipeCard();
        });
    } else {
      // Si le tableau de data entré en argument est vide, on affiche un message d'erreur
      this.recipesSection.innerHTML = `
      <p class="error-message">Aucune recette ne correspond à votre critère...<br>Vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
      `;
    }
  }

  displaydropdownbox() {
    // Création des différentes DropdownBox avec les paramètres associés via la class DropdownBox
    const templateIngredientsdropdownbox = new DropdownBox(
      "ingredients",
      "blue",
      "Ingrédient"
    );
    this.dropdownboxIngredients.innerHTML =
      templateIngredientsdropdownbox.createdropdownbox();

    const templateAppliancesdropdownbox = new DropdownBox(
      "appliances",
      "green",
      "Appareil"
    );
    this.dropdownboxAppliances.innerHTML =
      templateAppliancesdropdownbox.createdropdownbox();

    const templateUstensilsdropdownbox = new DropdownBox(
      "ustensils",
      "red",
      "Ustensile"
    );
    this.dropdownboxUstensils.innerHTML =
      templateUstensilsdropdownbox.createdropdownbox();

    // Ajout eventListeners des différentes DropdownBox via la class dropdownboxManagement
    const eventListenerdropdownbox = new dropdownboxManagement();
    eventListenerdropdownbox.eventListenerdropdownbox();
  }

  displayTagsList(data) {
    // Creation d'arrays contenant les listes pour chq type de tag
    // Liste sans doublon, classé alphabétiquement et commencant par 1 majuscule
    const elementsList = new ArrayGeneration(data);
    const allIngredients = elementsList.getAllIngredients();
    const allUstensils = elementsList.getAllUstensils();
    const allAppliances = elementsList.getAllAppliances();

    // Stockage ds des variables des éléments html recevant les différentes listes
    const dropdownboxListAppliances = document.getElementById(
      "dropdownbox-list-appliances"
    );
    const dropdownboxListIngredients = document.getElementById(
      "dropdownbox-list-ingredients"
    );
    const dropdownboxListUstensils = document.getElementById(
      "dropdownbox-list-ustensils"
    );

    // Stockage ds des variables des éléments html représentant les inputs de chq DropdownBox
    const dropdownboxInputAppliances = document.getElementById(
      "dropdownbox-input-appliances"
    );
    const dropdownboxInputIngredients = document.getElementById(
      "dropdownbox-input-ingredients"
    );
    const dropdownboxInputUstensils = document.getElementById(
      "dropdownbox-input-ustensils"
    );

    // Création des li-html pour chq catégorie de tag
    // Prends en arguments la liste de tag, l'id et les tags selectionnés
    const templateListTagsAppliances = new TagsList(
      allAppliances,
      "appliances",
      this.recipesStates.selectedTags
    );
    dropdownboxListAppliances.innerHTML =
      templateListTagsAppliances.getdropdownboxList();

    const templateListTagsIngredients = new TagsList(
      allIngredients,
      "ingredients",
      this.recipesStates.selectedTags
    );
    dropdownboxListIngredients.innerHTML =
      templateListTagsIngredients.getdropdownboxList();

    const templateListTagsUstensils = new TagsList(
      allUstensils,
      "ustensils",
      this.recipesStates.selectedTags
    );
    dropdownboxListUstensils.innerHTML =
      templateListTagsUstensils.getdropdownboxList();

    // Ajout des eventListener pour chq input de chq DropdownBox
    // Prends en arguments la variable de l'élément html (input) et la liste de tags
    const eventListenerInputIngredients = new dropdownboxInputManagement(
      dropdownboxInputIngredients,
      dropdownboxListIngredients
    );
    eventListenerInputIngredients.eventListenerdropdownbox();

    const eventListenerInputUstensils = new dropdownboxInputManagement(
      dropdownboxInputUstensils,
      dropdownboxListUstensils
    );
    eventListenerInputUstensils.eventListenerdropdownbox();

    const eventListenerInputAppliances = new dropdownboxInputManagement(
      dropdownboxInputAppliances,
      dropdownboxListAppliances
    );
    eventListenerInputAppliances.eventListenerdropdownbox();

    // Ajout des eventListeners et des comportements sur chq tag via la class TagManagement
    const eventListenerAllTags = new TagsManagement(this.recipesStates);
    eventListenerAllTags.eventListenerTags();
  }

  displaySearchBar() {
    // Création de la barre de recherche principale via la class SearchBar
    const templateSearchBar = new SearchBar();
    this.SearchBarSection.innerHTML += templateSearchBar.createSearchBar();

    // Ajout de eventListener et du comportement via la class SearchBarManagement
    const eventListenerSearchBar = new SearchBarManagement(this.recipesStates);
    eventListenerSearchBar.eventListenerSearchBar();
  }

  init() {
    // Methode qui permet l'initialisation de la page lors du premier chargement
    this.displayRecipes(this.recipesStates.initialState);
    this.displaydropdownbox();
    this.displayTagsList(this.recipesStates.initialState);
    this.displaySearchBar();
  }
}
