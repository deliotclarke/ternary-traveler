import buildInterestObj from "./objectBuilder";
import APIManager from "./dbCalls";
import DOMManager from "./DOMBuilder"


const editIntName = document.querySelector("#interest__name__form")
const editIntDesc = document.querySelector("#interest__desc__form")
const editIntReview = document.querySelector("#interest__review__form")
const editIntCost = document.querySelector("#interest__cost__form")
const editIntCountry = document.querySelector("#interest__country__form")
const editIntVisited = document.querySelector("#interest__visited__form")
const updateButton = document.createElement("button")
const saveButton = document.querySelector("#save__new__interest")

const sendToEditForm = (obj) => {
  editIntName.focus();

  editIntName.value = obj.name;
  editIntDesc.value = obj.description;
  editIntReview.value = obj.review;
  editIntCost.value = obj.cost;
  editIntCountry.value = obj.placeId;
  editIntVisited.value = obj.visited;

  updateButton.setAttribute("id", "form__update__button");
  updateButton.textContent = "Update!"
  updateButton.addEventListener("click", () => {


    let editObj = buildInterestObj(editIntCountry.value, editIntName.value, editIntDesc.value, editIntCost.value, editIntReview.value, editIntVisited.value);

    APIManager.editInterest(obj.id, editObj)
      .then(DOMManager.populateDOM);

    editIntName.value = "";
    editIntDesc.value = "";
    editIntReview.value = "";
    editIntCost.value = "";
    editIntCountry.value = "";
    editIntVisited.value = "";
  })

  saveButton.replaceWith(updateButton);




}

export default sendToEditForm