
const listButton = document.querySelector("#show__interests");
const formButton = document.querySelector("#add__interest");
const interestList = document.querySelector("#interest__list");
const interestForm = document.querySelector("#interest__form");


const getForm = formButton.addEventListener("click", () => {
  interestList.className = "hide";
  interestForm.className = "show";
})

const showList = listButton.addEventListener("click", () => {
  console.log("list button")
  interestForm.className = "hide";
  interestList.className = "show";
})

module.exports = {
  getForm,
  showList
}