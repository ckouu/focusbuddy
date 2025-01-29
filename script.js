function openPop(id) {
  let popup = document.getElementById(id);
  popup.style.visibility = "visible";
}

function closePop(id) {
  let popup = document.getElementById(id);
  popup.style.visibility = "hidden";
}

let myInterval;
let startTime;

function addTime(num) {
  if (!myInterval) {
    let timer = document.getElementById("timer");
    let min = parseInt(timer.textContent.substring(0, 2));
    if (num > 0 && min <= 80) {
      min += num;
    } else if (num < 0 && min >= 20) {
      min += num;
    }
    timer.textContent = (min + ":00");
  }
}

function startTimer() {
  if (!myInterval) {
    startTime = parseInt(document.getElementById("timer").textContent.substring(0, 2));
    myInterval = setInterval(changeTimer, 1000);
  }
}

function changeTimer() {
  let timer = document.getElementById("timer");
  let time = timer.textContent;
  let min = parseInt(time.substring(0, 2));
  let sec = parseInt(time.substring(3));
  if (sec === 0 && min !== 0) {
    sec = 59;
    min -= 1;
  } else if (sec !== 0) {
    sec -= 1;
  }
  if (min < 10 && sec < 10) {
    timer.textContent = ("0" + min + ":0" + sec);
  } else if (sec < 10) {
    timer.textContent = (min + ":0" + sec);
  } else if (min < 10) {
    timer.textContent = ("0" + min + ":" + sec);
  } else {
    timer.textContent = (min + ":" + sec);
  }

  if (min === 0 && sec === 0) {
    clearInterval(myInterval);
    let earnedCoins = startTime / 2;
    alert("time's up!\ncongrats on completing a " + startTime + " minute study session, here's " + earnedCoins + " coins!");
    addCoins(earnedCoins);
  }

}

function resetTimer() {
  let timer = document.getElementById("timer")
  timer.textContent = "30:00";
  clearInterval(myInterval);
  myInterval = null;
}

function addCoins(num) {
  let coins = document.getElementById("coins");
  let coinsNum = parseInt(coins.textContent);
  coinsNum += num;
  coins.textContent = "" + coinsNum;
}

function addLevel(num) {
  let level = document.getElementById("level");
  let levelNum = parseInt(level.textContent);
  levelNum += num;
  level.textContent = "" + levelNum;

  let creature = document.getElementById("creature")
  if (levelNum >= 20) {
    creature.src = "images/creature20.png";
    creature.className = "creature20"
  } else if (levelNum >= 10) {
    creature.src = "images/creature10.png";
    creature.className = "creature10";
  }
}

function selectFood(id) {
  let food = document.getElementById(id);
  if (!food.style.border) {
    food.style.border = "3px solid grey";
  } else {
    food.style.border = null;
  }
}

let foods = new Map([
    ["apple", 10],
    ["cheese", 15],
    ["chicken", 20]
]);

function buyFood() {
  let coinsNum = parseInt(document.getElementById("coins").textContent);
  foods.forEach((price, foodName) => {
    let food = document.getElementById(foodName);
    if (food.style.border) {
      if (coinsNum >= price) {
        addToFridge(foodName);
        alert("successfully bought " + foodName);
        addCoins(-price);
      } else {
        alert("not enough coins! start a study session to earn coins!");
      }
      food.style.border = null;
    }
  })
}

function addToFridge(food) {
  let id = food + '-fri';
  let foodInFridge = document.getElementById(id);
  foodInFridge.classList.remove("empty");
  addFoodNum(food, 1);
}

function giveFood() {
  foods.forEach((price, foodName) => {
    let food = document.getElementById(foodName + "-fri");
    if (food.style.border) {
      let levelsPlus = (price - 5) / 5;
      alert("CREATURE loved the snack! plus " + levelsPlus + " levels!");
      addLevel(levelsPlus);
      let newNum = addFoodNum(foodName, -1);
      if (newNum <= 0) {
        food.classList.add("empty");
      }
      food.style.border = null;
    }
  })
}

function addFoodNum(id, num) {
  let food = document.getElementById(id + "-num");
  let newNum = parseInt(food.textContent);
  newNum += num;
  food.textContent = "" + newNum;
  return newNum;
}

function pet() {
  let creature = document.getElementById('creature');
  let creatureNum = creature.className;

  creature.src = "images/" + creatureNum + "click.png";
  setTimeout(function() {creature.src = "images/" + creatureNum + ".png"}, 1000);
  
}

function hover(func) {
  let creature = document.getElementById('creature');
  let creatureNum = creature.className;
  if (!creature.src.includes("click")) {
    if (func === "over") {
      creature.src = "images/" + creatureNum + "hover.png";
    } else {
      creature.src = "images/" + creatureNum + ".png";
    }
  }
}
