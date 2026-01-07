const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");
const resetBtn = document.querySelector(".reset");
const colorPick = document.getElementById("colorPick");
const saveTextToFileBtn = document.querySelector(".download");
let fontSizeInput = document.getElementById("fontSize");
const criptaBtn = document.querySelector(".cripta");
let shift = document.getElementById("shift");
const cercaBtn = document.querySelector(".cerca");
let parola = document.getElementById("parola");


function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}


const characters = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const places = ["the soup kitchen", "Disneyland", "the White House"];
const events = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and slithered away",
];


function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `It was 94 Fahrenheit outside, so ${randomCharacter}
   went for a walk. When they got to ${randomPlace}
   ,they stared in horror for a few moments, then ${randomEvent}
   . Bob saw the whole thing, but was not surprised - ${randomCharacter}
    weighs 300 pounds, and it was a hot day.`;

  return storyText;
}


generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 / 14)} stone`;
    const temperature = `${Math.round((94 - 32) * (5 / 9))} Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}

resetBtn.addEventListener("click", resetStory);

function resetStory() {

  story.textContent = '';
story.style.visibility = 'hidden';
customName.value = '';
document.getElementById("uk").checked = false;
}

colorPick.addEventListener("input",function(){

  story.style.backgroundColor = colorPick.value;
});

saveTextToFileBtn.addEventListener("click", () => {
  saveTextToFile(story.textContent, "story.txt");
});


function saveTextToFile(text, filename) {
      const blob = new Blob([text], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    }



fontSizeInput.addEventListener("input",function(){
  story.style.fontSize = fontSizeInput.value + "px";
});

function caesarCipher(text, shift) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let result = "";

  for (let char of text) {

    if (alphabet.includes(char)) {
      let oldIndex = alphabet.indexOf(char);
      let newIndex = (oldIndex + shift) % alphabet.length;
      if (newIndex < 0) newIndex += alphabet.length;
      result += alphabet[newIndex];
    }

    else if (alphabetUpper.includes(char)) {
      let oldIndex = alphabetUpper.indexOf(char);
      let newIndex = (oldIndex + shift) % alphabetUpper.length;
      if (newIndex < 0) newIndex += alphabetUpper.length;
      result += alphabetUpper[newIndex];
    }

    else {
      result += char;
    }
  }
  return result;
}

criptaBtn.addEventListener("click", () => {
  let amount = parseInt(shift.value);

  if (isNaN(amount)) {
    alert("shift non è un numero valido, shift non può essere vuoto");
    return;
  }

  story.textContent = caesarCipher(story.textContent, amount);
});


cercaBtn.addEventListener("click", () => {
  const ricerca = parola.value.trim();

  if (!ricerca) return;
  let testo = story.textContent;

  const regex = new RegExp(`(${ricerca})`, "gi");

  const evidenz = testo.replace(regex, '<span style="background-color: yellow;">$1</span>');
  story.innerHTML = evidenz;
});