import buildInterestObj from "./objectBuilder";
import APIManager from "./dbCalls";
import DOMManager from "./DOMBuilder";

const saveInterestButton = document.querySelector("#save__new__interest")
const newIntName = document.querySelector("#interest__name__form")
const newIntDesc = document.querySelector("#interest__desc__form")
const newIntReview = document.querySelector("#interest__review__form")
const newIntCost = document.querySelector("#interest__cost__form")
const newIntCountry = document.querySelector("#interest__country__form")
const newIntVisited = document.querySelector("#interest__visited__form")
const interestForm = document.querySelector("#interest__form");
const interestList = document.querySelector("#interest__list");



const saveButton = saveInterestButton.addEventListener("click", () => {

  let newIntObj = buildInterestObj(
    Number(newIntCountry.value),
    newIntName.value,
    newIntDesc.value,
    newIntCost.value,
    newIntReview.value,
    newIntVisited.value
  )

  APIManager.addInterest(newIntObj)
    .then(DOMManager.populateDOM)

  alert("Success");

  interestForm.className = "hide";
  interestList.className = "show";

})

export default saveButton