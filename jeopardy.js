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
const catIds = [];

async function getCategoryIds() {
  for (let i = 0; i < 6; i++) {
    const response = await fetch("http://jservice.io/api/random");
    const data = await response.json();
    catIds.push(data[0].category.id);
  }
  console.log(catIds, "catIds in getCategoryIds");
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

let category = {};
let clues = [];

async function getCategory(catIds) {
  for (let i = 0; i < 6; i++) {
    const response = await fetch("http://jservice.io/api/clues");
    const data = await response.json();
    console.log(data[0].category_id, "data in getCategory");
    console.log(catIds[i], "catIds in getCategory");
  }
  //     if (data[0].category_id == catIds[i]) {
  //       let category = {
  //         title: data[0].category.title,
  //         clues: [
  //           { question: data[0].answer, answer: data[0].question, showing: null },
  //         ],
  //       };
  //       return category;
  //     }
  //   }
  //   console.log(category);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

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
    //     evt.target.innerText = "question"    }
    // else if (evt.target.innerText === "question") {
    //     evt.target.innerText = "answer"}
    // else if (evt.target.innerText === "answer") {
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
