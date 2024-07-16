// Selecting all required elements
const selectBox = document.querySelector(".select-box"),
  selectBtnX = selectBox.querySelector(".options .playerX"),
  selectBtnO = selectBox.querySelector(".options .playerO"),
  playBoard = document.querySelector(".play-board"),
  players = document.querySelector(".players"),
  allBox = document.querySelectorAll(".play-area span"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");

window.onload = () => {
  // Once window loaded
  for (let i = 0; i < allBox.length; i++) {
    // Add onclick attribute in all available span
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
};

selectBtnX.onclick = () => {
  selectBox.classList.add("hide"); // Hide select box
  playBoard.classList.add("show"); // Show the playboard section
};

selectBtnO.onclick = () => {
  selectBox.classList.add("hide"); // Hide select box
  playBoard.classList.add("show"); // Show the playboard section
  players.classList.add("active"); // Set class attribute in players with active values
};

let playerXIcon = "fas fa-times"; // Class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; // Class name of fontawesome circle icon
let playerSign = "X"; // This is a global variable because we've used this variable inside multiple functions
let runBot = true; // This also a global variable with boolean value..we used this variable to stop the bot once match won by someone or drawn

// User click function
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O"; // If player chooses (O) then change playerSign to O
    element.innerHTML = `<i class="${playerOIcon}"></i>`; // Adding circle icon tag inside user clicked element/box
    players.classList.add("active"); // Add active class in players
    element.setAttribute("id", playerSign); // Set id attribute in span/box with player chosen sign
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`; // Adding cross icon tag inside user clicked element/box
    players.classList.add("active"); // Add active class in players
    element.setAttribute("id", playerSign); // Set id attribute in span/box with player chosen sign
  }
  selectWinner(); // Call selectWinner function
  element.style.pointerEvents = "none"; // Once user selects any box then that box can't be clicked again
  playBoard.style.pointerEvents = "none"; // Add pointerEvents none to playboard so user can't immediately click on any other box until bot selects
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed(); // Generate random number so bot will randomly delay to select unselected box
  setTimeout(() => {
    bot(); // Call bot function
  }, randomTimeDelay); // Passing random delay value
}

// Bot auto select function
function bot() {
  let array = []; // Creating empty array...we'll store unclicked boxes index
  if (runBot) {
    // If runBot is true
    playerSign = "O"; // Change the playerSign to O so if player has chosen X then bot will O
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        // If the box/span has no children means <i> tag
        array.push(i); // Inserting unclicked boxes number/index inside array
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // Getting random index from array so bot will select random unselected box
    if (array.length > 0) {
      // If array length is greater than 0
      if (players.classList.contains("player")) {
        playerSign = "X"; // If player has chosen O then bot will X
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // Adding cross icon tag inside bot selected element
        players.classList.remove("active"); // Remove active class in players
        allBox[randomBox].setAttribute("id", playerSign); // Set id attribute in span/box with player chosen sign
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // Adding circle icon tag inside bot selected element
        players.classList.remove("active"); // Remove active class in players
        allBox[randomBox].setAttribute("id", playerSign); // Set id attribute in span/box with player chosen sign
      }
      selectWinner(); // Call selectWinner function
    }
    allBox[randomBox].style.pointerEvents = "none"; // Once bot selects any box then user can't click on that box
    playBoard.style.pointerEvents = "auto"; // Add pointerEvents auto in playboard so user can again click on box
    playerSign = "X"; // If player has chosen X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for bot
  }
}

function getIdVal(classname) {
  return document.querySelector(".box" + classname).id; // Return id value
}

function checkIdSign(val1, val2, val3, sign) {
  // Checking all id values are equal to sign (X or O) or not if yes then return true
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
}

// Selecting winner function
function selectWinner() {
  // If one of the following winning combinations match then select the winner
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    runBot = false; // Passing false boolean value to runBot so bot won't run again
    bot(); // Call bot function
    setTimeout(() => {
      // After match won by someone then hide the playboard and show the result box after 700ms
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700); // 1s = 1000ms
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; // Displaying winning text with passing playerSign (X or O)
  } else {
    // If all boxes/elements have id value and still no one wins then draw the match
    if (
      getIdVal(1) != "" &&
      getIdVal(2) != "" &&
      getIdVal(3) != "" &&
      getIdVal(4) != "" &&
      getIdVal(5) != "" &&
      getIdVal(6) != "" &&
      getIdVal(7) != "" &&
      getIdVal(8) != "" &&
      getIdVal(9) != ""
    ) {
      runBot = false; // Passing false boolean value to runBot so bot won't run again
      bot(); // Call bot function
      setTimeout(() => {
        // After match drawn then hide the playboard and show the result box after 700ms
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700); // 1s = 1000ms
      wonText.textContent = "Match has been drawn!"; // Display draw match text
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload(); // Reload the current page on replay button click
};
