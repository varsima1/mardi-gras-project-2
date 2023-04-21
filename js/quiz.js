//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 31;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "In which country did Mardi Gras originate?",
    options: ["Brazil", "United States", "France", "Italy"],
    correct: "France",
  },
  {
    id: "1",
    question: "What does Mardi Gras translate to in English?",
    options: [
      "Fat Tuesday",
      "Crazy Carnival",
      "Happy Holiday",
      "Joyful Festivity",
    ],
    correct: "Fat Tuesday",
  },
  {
    id: "2",
    question:
      "What are the traditional Mardi Gras colors and what do they represent?",
    options: [
      "Red, white, and blue representing patriotism",
      "Green, purple, and gold representing faith, justice, and power",
      "Pink, yellow, and orange representing happiness, sunshine, and warmth",
      "Blue, black, and silver representing elegance and sophistication",
    ],
    correct: "Green, purple, and gold representing faith, justice, and power",
  },
  {
    id: "3",
    question: "What is a traditional Mardi Gras food?",
    options: [
      "Spaghetti and meatballs",
      "Hamburger and fries",
      "Jambalaya",
      "Caesar salad",
    ],
    correct: "Jambalaya",
  },
  {
    id: "4",
    question: "What type of music is traditionally played during Mardi Gras?",
    options: [
      "Classical music",
      "Country music",
      "Jazz music",
      "Heavy metal music",
    ],
    correct: "Jazz music",
  },
  {
    id: "5",
    question:
      "In what US city is Mardi Gras celebrated with the most enthusiasm?",
    options: ["New York City", "Los Angeles", "New Orleans", "Chicago"],
    correct: "New Orleans",
  },
  {
    id: "6",
    question:
      "Which day is considered the official start of Mardi Gras season?",
    options: [
      "Christmas Day",
      "New Year's Day",
      "Epiphany (January 6th)",
      "Valentine's Day",
    ],
    correct: "Epiphany (January 6th)",
  },
  {
    id: "7",
    question: "What is a traditional Mardi Gras parade float made of?",
    options: ["Wood", "Metal", "Papier-mâché", "Plastic"],
    correct: "Papier-mâché",
  },
  {
    id: "8",
    question: "What is the name of the King of Mardi Gras?",
    options: ["King Louis", "King Henry", "King Arthur", "King Rex"],
    correct: "King Rex",
  },
  {
    id: "9",
    question:
      "What is the traditional Mardi Gras bead color for throwing to represent luck?",
    options: ["Green", "Purple", "Gold", "White"],
    correct: "Gold",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 31;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 31;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
