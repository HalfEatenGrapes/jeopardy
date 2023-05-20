let categories = [];
let wholeboard = {};

const answeredQuestions = document.getElementsByClassName("question");
const question2 = document.getElementsByClassName("200");
const question4 = document.getElementsByClassName("400");
const question6 = document.getElementsByClassName("600");
const question8 = document.getElementsByClassName("800");
const question10 = document.getElementsByClassName("1000");
const category = document.getElementsByClassName("cat");

const board = document.querySelector(".board");
board.addEventListener("click", handleClick);

const startButton = document.querySelector(".start");
startButton.addEventListener("click", setupAndStart);

/** On click of start / restart button, set up game. */
async function setupAndStart() {
  showLoadingView();
  if (startButton.innerHTML === "Start!") {
    await fillTable();
    hideLoadingView();
    startButton.innerHTML = "Restart";
  } else {
    wholeboard = {};
    categories = [];
    console.log(answeredQuestions);
    for (changedquestion of answeredQuestions) {
      if (changedquestion.classList.contains("notavailable")) {
        changedquestion.classList.replace("notavailable", "available");
      }
    }
    await fillTable();
    hideLoadingView();
  }
}

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIds() {
  const catIds = [];
  for (let i = 0; i < 6; i++) {
    const response = await fetch("http://jservice.io/api/random");
    const data = await response.json();
    let catId = data[0].category.id;
    catIds.push(catId);
  }
  return catIds;
}

/** Return object with data about a category:
 */
async function getCategory() {
  const catIds = await getCategoryIds();
  for (let cat of catIds) {
    const response = await fetch(`http://jservice.io/api/category?id=${cat}`);
    const data = await response.json();
    let category = data.title;
    categories.push(category);
    wholeboard[category] = {};
    for (let i = 0; i < data.clues.length; i++) {
      if (data.clues[i] === undefined) {
        continue;
      }
      let values = data.clues[i].value;
      wholeboard[category][values] = {};
      wholeboard[category][values].question = data.clues[i].answer;
      wholeboard[category][values].answer = data.clues[i].question;
    }
  }
  return wholeboard;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 */
async function fillTable() {
  await getCategory();
  console.log(wholeboard, "is wholeboard");
  for (let i = 0; i < 6; i++) {
    category[i].innerHTML = categories[i];
    const keys = Object.keys(wholeboard[categories[i]]);
    const q1Key = keys[0];
    const q2Key = keys[1];
    const q3Key = keys[2];
    const q4Key = keys[3];
    const q5Key = keys[4];

    question2[i].dataset.category = categories[i];
    question2[i].dataset.value = parseInt(q1Key);

    question4[i].dataset.category = categories[i];
    question4[i].dataset.value = parseInt(q2Key);

    question6[i].dataset.category = categories[i];
    question6[i].dataset.value = parseInt(q3Key);

    question8[i].dataset.category = categories[i];
    question8[i].dataset.value = parseInt(q4Key);

    question10[i].dataset.category = categories[i];
    question10[i].dataset.value = parseInt(q5Key);
  }
}

let asked = false;
let answered = false;
/** Handle clicking on a clue: show the question or answer.
 * */
function handleClick(evt) {
  const category = evt.target.dataset.category;
  const value = parseInt(evt.target.dataset.value);
  const question = wholeboard[category][value].question;
  const answer = wholeboard[category][value].answer;
  if (!answered && !asked) {
    evt.target.innerHTML = answer;
    asked = true;
  } else if (asked && !answered) {
    evt.target.innerHTML = question;
    answered = true;
  } else if (asked && answered) {
    // make innerHTML the class name
    evt.target.innerHTML = evt.target.classList[0];
    evt.target.classList.replace("available", "notavailable");
    asked = false;
    answered = false;
    evt.target.removeEventListener("click", handleClick);
  }
}

/** show the loading spinner  */
function showLoadingView() {
  document.querySelector("body").style.cursor = "progress";
  document.querySelector(".start").style.cursor = "progress";
}

/** Remove the loading spinner. */
function hideLoadingView() {
  document.querySelector("body").style.cursor = "pointer";
  document.querySelector(".start").style.cursor = "pointer";
}
