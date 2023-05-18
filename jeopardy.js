// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
let categories = [];

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
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
let answers = [];
let questions = [];

async function getCategory() {
  const catIds = await getCategoryIds();
  for (let cat of catIds) {
    const response = await fetch(`http://jservice.io/api/category?id=${cat}`);
    const data = await response.json();
    // console.log(data.clues);
    let category = data.title;
    categories.push(category);
    for (let i = 0; i < 6; i++) {
      let question = data.clues[i].answer;
      questions.push(question);
    //   let answer = data.clues[i].question;
    //   answers.push(answer);
    // }
    console.log(questions, "qs during");
    // console.log(answers, "as");
  }
  // console.log(categories, "cats");
  console.log(questions, "qs after");
  return categories;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
const question2 = document.getElementsByClassName("200");
const question4 = document.getElementsByClassName("400");
const question6 = document.getElementsByClassName("600");
const question8 = document.getElementsByClassName("800");
const question10 = document.getElementsByClassName("1000");
const allQuestions = document.getElementsByClassName("question");
const category = document.getElementsByClassName("cat");

async function fillTable() {
  await getCategory();
  for (let i = 0; i < categories.length; i++) {
    category[i].innerHTML = category[i];
  }
  // for (let i = 0; i < questions.length; i++) {
  //   allQuestions[i].innerHTML = allQuestions[i];
  // }
}

const board = document.querySelector(".board");

board.addEventListener("click", handleClick);

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick(evt) {
  if (evt.target.classList.contains("available")) {
    //   evt.target.innerText = question;
    // } else if (evt.target.innerText === question) {
    //   evt.target.innerText = answer;
    // } else if (evt.target.innerText === answer) {
    evt.target.classList.replace("available", "notavailable");
  }
  console.log(evt.target.classList);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
