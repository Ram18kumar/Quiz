//// method 1 frrom quiz api
let easy = document.querySelector(".easy");
let hard = document.querySelector(".hard");
let medium = document.querySelector(".medium");
let quizCards = document.querySelector(".quizCards");
// let start = document.querySelector(".start");
let heading = document.querySelector(".heading");
let body = document.querySelector("body");
let currentQuestion = 0;
let quizData;
var QuizLevel;
var totalScore = 0;
let questionNo = 1;



easy.addEventListener("click", () => {
  quizCards.innerHTML="";
  difficulty("easy");
  startPage();
});

hard.addEventListener("click", () => {
  quizCards.innerHTML="";
  difficulty("hard");
  startPage();
});

medium.addEventListener("click", () => {
  quizCards.innerHTML="";
  difficulty("medium");
  startPage();
});


body.classList.add("myStyle");
// start.addEventListener("click", () => {
//   startPage();
// });
function startPage() {
  // start.style.display = "none";
  quizCards.style.display = "flex";
  heading.style.display = "block";
  body.classList.remove("myStyle");
  easy.classList.add("display");
  hard.classList.add("display");
  medium.classList.add("display");
  // difficulty(element);
}

function difficulty(element) {
  fetch(
    `https://quizapi.io/api/v1/questions?apiKey=y2gnQJ6bVwXjeADgOvbqIhWbSmDF43Nvu8W20IcI&limit=10&category=Linux&difficulty=${element}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      // console.log(data[0].answers["answer_b"]);
      // const lo=data[0].correct_answer
      // console.log(data[0].answers[data[0].correct_answer]);
      quizData = data;
      display(quizData);
    })
    .catch((error) => {
      console.error("Error fetching quiz data:", error);
    });
}
function display(data) {
  if (currentQuestion < data.length) {
    let card = data[currentQuestion];
    let div = document.createElement("div");
    // console.log(card.answers["answer_a"]);
    // console.log(card.correct_answer);
    // console.log(typeof "true");
    // console.log(card.correct_answers["answer_a_correct"]=="true");
    // console.log(quizData.correct_answer);
    div.innerHTML = `
      <div class="card">
        <div class="card-body">
           <h5 class="card-title">Question No: ${questionNo}/ 10</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${card.difficulty}</h6>
          <p class="card-text">${card.question}</p>
          <form onsubmit="submitBtn(event)">
            <div class="">
              <label class="form-label">Select an option:</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option1" value="${card.option1}" data-target="${card.correct_answers["answer_a_correct"]}">
              <label class="form-check-label" for="option1">${card.answers["answer_a"]}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option2" value="${card.option2}" data-target="${card.correct_answers["answer_b_correct"]}">
              <label class="form-check-label" for="option2">${card.answers["answer_b"]}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option3" value="${card.option3}" data-target="${card.correct_answers["answer_c_correct"]}">
              <label class="form-check-label" for="option3">${card.answers["answer_c"]}</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="quizOption" id="option4" value="${card.option4}" data-target="${card.correct_answers["answer_d_correct"]}">
              <label class="form-check-label" for="option4">${card.answers["answer_d"]}</label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" name="quizOption" id="option3" value="${card.option5}" data-target="${card.correct_answers["answer_e_correct"]}">
            <label class="form-check-label" for="option3">${card.answers["answer_e"]}</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="quizOption" id="option4" value="${card.option6}" data-target="${card.correct_answers["answer_f_correct"]}">
            <label class="form-check-label" for="option4">${card.answers["answer_f"]}</label>
          </div>
           <div class="text-center mt-2">
           <button type="submit"class="btn btn-primary w-100 text-center">Submit</button>
          </div>
            </form>
        </div>
      </div>`;
    quizCards.appendChild(div);
  } else {
    quizCards.innerHTML = `<p>Quiz completed! Thank you.</p>
    <button class="btn btn-primary" onclick="returnToStartPage()">Return to Start</button>
   
    <h1> totalScore ${totalScore} / 10 </h1>`;
    if (totalScore > 10) {
      quizCards.innerHTML = `<p>Quiz completed! Thank you.</p>
      <button class="btn btn-primary" onclick="returnToStartPage()">Return to Start</button>
   
      <h1> totalScore ${totalScore} / 10 </h1>`;
    } else {
      quizCards.innerHTML = `<p>Quiz completed! Loser</p>
      <button class="btn btn-primary" onclick="returnToStartPage()">Return to Start</button>
      <h1> totalScore ${totalScore} / 10 </h1>`;
    }
  }
}

function returnToStartPage() {
  // Reset the quiz and show the start page again
  easy.classList.remove("display");
  hard.classList.remove("display");
  medium.classList.remove("display");
  heading.style.display = "block";
  quizCards.innerHTML = "";
  totalScore = 0;
  currentQuestion = 0;
  questionNo = 1;
}




function submitBtn(event) {
  event.preventDefault();
  const selectedOption = document.querySelector(
    'input[name="quizOption"]:checked'
  );

  if (selectedOption) {
    // const userAnswer = selectedOption.value;
    const correctAnswer = selectedOption.getAttribute("data-target");
    const explanation = quizData[currentQuestion].explanation;
    const correct_answer =
      quizData[currentQuestion].answers[
        quizData[currentQuestion].correct_answer
      ];
    console.log(correct_answer);
    // console.log(explanation);
    // if (userAnswer === correctAnswer) {
    if (correctAnswer == "true") {
      // alert("Correct! Well done!");

      quizCards.innerHTML = ` <div class="toasts">
      <div class="toast-header">
        <h1>correct Answer.</h1>
        your answer is:
      </div>
      <div class="toast-body">
      "${correct_answer}"\n\nExplanation: ${explanation}
      </div>
      </div>`;

      console.log("correct", totalScore++);
    } else {
      console.log("wrong", totalScore--);

      quizCards.innerHTML = ` 
      <div class="toasts">
      <div class="toast-header">
       <h1> Incorrect.</h1>
        The correct answer is:
      </div>
      <div class="toast-body">
      "${correct_answer}"\n\nExplanation: ${explanation}
      </div>
      </div>
      
      `;
    }
    setTimeout(() => {
      questionNo++;
      currentQuestion++;
      quizCards.innerHTML = "";
      display(quizData);
    }, 5000);
  } else {
    alert("Please select an option.");
  }
}

// method 2 from script.json file

// let quizCards = document.querySelector(".quizCards");
// let start = document.querySelector(".start");
// let heading = document.querySelector(".heading");
// let body = document.querySelector("body");
// let currentQuestion = 0;
// let quizData;
// var totalScore = 0;

// body.classList.add("myStyle");
// start.addEventListener("click", () => {
//   start.style.display = "none";
//   quizCards.style.display = "flex";
//   heading.style.display = "block";
//   body.classList.remove("myStyle");
// });

// fetch("script.json")
//   .then((res) => res.json())
//   .then((data) => {
//     quizData = data;
//     display(quizData);
//   });

// function display(data) {
//   if (currentQuestion < data.length) {
//     let card = data[currentQuestion];
//     let div = document.createElement("div");
//     div.innerHTML = `
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title">Question No: ${card.id}</h5>
//           <h6 class="card-subtitle mb-2 text-body-secondary">Easy</h6>
//           <p class="card-text">${card.question}</p>
//           <form onsubmit="submitBtn(event)">
//             <div class="">
//               <label class="form-label">Select an option:</label>
//             </div>
//             <div class="form-check">
//               <input class="form-check-input" type="radio" name="quizOption" id="option1" value="${card.option1}" data-target="${card.correctOption}">
//               <label class="form-check-label" for="option1">${card.option1}</label>
//             </div>
//             <div class="form-check">
//               <input class="form-check-input" type="radio" name="quizOption" id="option2" value="${card.option2}" data-target="${card.correctOption}">
//               <label class="form-check-label" for="option2">${card.option2}</label>
//             </div>
//             <div class="form-check">
//               <input class="form-check-input" type="radio" name="quizOption" id="option3" value="${card.option3}" data-target="${card.correctOption}">
//               <label class="form-check-label" for="option3">${card.option3}</label>
//             </div>
//             <div class="form-check">
//               <input class="form-check-input" type="radio" name="quizOption" id="option4" value="${card.option4}" data-target="${card.correctOption}">
//               <label class="form-check-label" for="option4">${card.option4}</label>
//             </div>
//            <div class="text-center mt-2">
//            <button type="submit"class="btn btn-primary w-100 text-center">Submit</button>
//           </div>
//             </form>
//         </div>
//       </div>`;
//     quizCards.appendChild(div);
//   } else {
//     quizCards.innerHTML = `<p>Quiz completed! Thank you.</p>

//     <h1> totalScore ${totalScore} / 10 </h1>`;
//   }
// }

// function submitBtn(event) {
//   event.preventDefault();
//   const selectedOption = document.querySelector(
//     'input[name="quizOption"]:checked'
//   );

//   if (selectedOption) {
//     const userAnswer = selectedOption.value;
//     const correctAnswer = selectedOption.getAttribute("data-target");
//     const explanation = quizData[currentQuestion].Explanation;
//     if (userAnswer === correctAnswer) {
//       // alert("Correct! Well done!");
//       quizCards.innerHTML = ` <div class="toasts">
//       <div class="toast-header">
//         <h1 class="me-auto">correct Answer.</h1>
//         your answer is:
//       </div>
//       <div class="toast-body">
//       ${correctAnswer}\n\nExplanation: ${explanation}
//       </div>
//       </div>`;

//       console.log("correct", totalScore++);
//     } else {
//       console.log("wrong", totalScore--);

//       quizCards.innerHTML = `
//       <div class="toasts">
//       <div class="toast-header">
//        <h1> <strong class="me-auto">Incorrect.</strong></h1>
//         The correct answer is:
//       </div>
//       <div class="toast-body">
//       ${correctAnswer}\n\nExplanation: ${explanation}
//       </div>
//       </div>

//       `;
//     }
//     setTimeout(() => {
//       currentQuestion++;
//       quizCards.innerHTML = "";
//       display(quizData);
//     }, 5000);
//   } else {
//     alert("Please select an option.");
//   }
// }