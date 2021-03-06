import APIManager from "./dbCalls";
import edit from "./editForm";

const visitedOutput = document.querySelector("#visited__output")
const unvisitedOutput = document.querySelector("#unvisited__output");

const setAttributes = (element, attributes) => {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

const confirmFunction = (obj) => {
  let sure = confirm(`Are you sure you'd like to delete ${obj.name}?`);
  if (sure === true) {
    APIManager.deleteInterest(obj.id)
      .then(DOMManager.populateDOM);

    alert(`${obj.name} deleted!`);
  }
}

const DOMManager = {
  populateDOM() {
    visitedOutput.innerHTML = "";
    unvisitedOutput.innerHTML = "";
    APIManager.getAllInterests()
      .then(interests => {
        interests.forEach(interest => {
          let visitedArray = [];
          let unvisitedArray = [];
          if (interest.visited === "true") {

            let interestElement = DOMManager.buildVisited(interest);
            visitedArray.push(interestElement);

          } else if (interest.visited === "false") {

            let interestElement = DOMManager.buildUnvisited(interest);
            unvisitedArray.push(interestElement);

          }

          visitedArray.forEach(element => {
            visitedOutput.appendChild(element);
          })
          unvisitedArray.forEach(element => {
            unvisitedOutput.appendChild(element);
          })
        })
      })
  },
  buildVisited(obj) {

    //create div and set attributes
    let intDiv = document.createElement("div");

    setAttributes(intDiv, {
      id: `interest__${obj.id}`,
      class: "interest__div",
    })

    //create content
    let intName = document.createElement("h3");
    setAttributes(intName, {
      class: "interest__name"
    })
    intName.textContent = obj.name;

    let intDesc = document.createElement("h4");
    setAttributes(intDesc, {
      class: "interest__desc"
    })
    intDesc.textContent = obj.description;

    let intReview = document.createElement("p");
    setAttributes(intReview, {
      class: "interest__review"
    })
    intReview.textContent = obj.review;

    let intCost = document.createElement("h4");
    setAttributes(intCost, {
      class: "interest__cost"
    })
    intCost.textContent = `cost: ${obj.cost}`;

    let editButton = document.createElement("button");
    setAttributes(editButton, {
      id: `edit__button__${obj.id}`,
      class: "edit__button"
    })
    editButton.textContent = "edit";
    editButton.addEventListener("click", () => {

      APIManager.getSingleInterest(obj.id)
        .then(obj => {
          edit(obj);
        })

    })

    let deleteButton = document.createElement("button");
    setAttributes(deleteButton, {
      id: `delete__button__${obj.id}`,
      class: "delete__button"
    })
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
      confirmFunction(obj)
    })

    //append all to div
    intDiv.appendChild(intName);
    intDiv.appendChild(intDesc);
    intDiv.appendChild(intReview);
    intDiv.appendChild(intCost);
    intDiv.appendChild(editButton);
    intDiv.appendChild(deleteButton);

    //return built element
    return intDiv;

  },
  buildUnvisited(obj) {

    //create div and set attributes
    let intDiv = document.createElement("div");
    setAttributes(intDiv, {
      id: `interest__${obj.id}`,
      class: "interest__div__unvisited"
    })

    //create content
    let intName = document.createElement("h3");
    setAttributes(intName, {
      class: "interest__name"
    })
    intName.textContent = obj.name;

    let intDesc = document.createElement("h4");
    setAttributes(intDesc, {
      class: "interest__desc"
    })
    intDesc.textContent = obj.description;

    let inputDiv = document.createElement("div");
    setAttributes(inputDiv, {
      id: `input__div__${obj.id}`,
      class: `input__div__${obj.id} hide`
    })


    let reviewInputLabel = document.createElement("h5");
    setAttributes(reviewInputLabel, {
      class: "review__input__label"
    })
    reviewInputLabel.textContent = "What did you think?"
    let reviewInput = document.createElement("textarea");
    setAttributes(reviewInput, {
      id: "review__input",
      class: "review__input"
    })

    let costInputLabel = document.createElement("h5");
    setAttributes(costInputLabel, {
      class: "cost__input__label"
    })
    costInputLabel.textContent = "Cost?"
    let costInput = document.createElement("input");
    setAttributes(costInput, {
      id: "cost__input",
      class: "cost__input"

    })
    let saveInputButton = document.createElement("button");
    setAttributes(saveInputButton, {
      id: `save__input__${obj.id}`,
      class: "save__input__button"
    })
    saveInputButton.textContent = "save!"
    saveInputButton.addEventListener("click", () => {

      let newCost = costInput.value;
      let newReview = reviewInput.value;

      let newObjValues = {
        cost: newCost,
        review: newReview,
        visited: "true"
      }

      APIManager.editInterest(obj.id, newObjValues)
        .then(DOMManager.populateDOM);

    })

    inputDiv.appendChild(reviewInputLabel);
    inputDiv.appendChild(reviewInput);
    inputDiv.appendChild(costInputLabel);
    inputDiv.appendChild(costInput);
    inputDiv.appendChild(saveInputButton);

    let updateButton = document.createElement("button");
    setAttributes(updateButton, {
      id: `update__button__${obj.id}`,
      class: "update__button"
    })
    updateButton.textContent = "update";
    updateButton.addEventListener("click", () => {

      setAttributes(inputDiv, {
        class: `input__div__${obj.id} show`
      })
      intDiv.removeChild(updateButton);
      intDiv.removeChild(deleteButton);

    })

    let deleteButton = document.createElement("button");
    setAttributes(deleteButton, {
      id: `delete__button__${obj.id}`,
      class: "delete__button"
    })
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
      confirmFunction(obj)
    })

    //append all to div
    intDiv.appendChild(intName);
    intDiv.appendChild(intDesc);
    intDiv.appendChild(updateButton);
    intDiv.appendChild(deleteButton);
    intDiv.appendChild(inputDiv);

    //return built element
    return intDiv;
  }
}


export default DOMManager