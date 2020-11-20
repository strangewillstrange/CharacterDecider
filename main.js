let characters = [];
let currentCharacter = {};

loadCharacters();

function setCharacter(event) {
  event.preventDefault();
  let form = event.target;
  let characterName = form.characterName.value;

  currentCharacter = characters.find((character) => character.name == characterName);

  if (!currentCharacter) {
    currentCharacter = { name: characterName};
    characters.push(currentCharacter);
    saveCharacters();
  }

  let template = "";

  template += `
    <div class="d-flex space-between current-player-text">
    <span>
    ${currentCharacter.name}
    </span>
    </div>
    `;

  document.getElementById("current").innerHTML = template;

  form.reset();
  hideElementById("select-character");
  showElementById("current-character")
  showElementById("race");
  draw();
  drawCharacterList();
}

function changeCharacter(event){
  location.reload();
}

function saveCharacters() {
  window.localStorage.setItem("characters", JSON.stringify(characters));
}

function loadCharacters() {
  let charactersData = JSON.parse(window.localStorage.getItem("characters"));
  if (charactersData) {
    characters = charactersData;
  }
}

function drawCharacterList() {
  let template = "";

  characters.forEach((character) => {
    template += `
    <div class="d-flex space-between">
    <span>
    <i class="fa fa-shield" aria-hidden="true"></i>
    ${character.name}
    </span>
    </div>
    `;
  });

  document.getElementById("character-name").innerHTML = template;
}

function draw() {
  let playerNameElem = document.getElementById("character-name");

  playerNameElem.innerText = currentCharacter.name;
}

function hideElementById(id){
  document.getElementById(id).classList.add("hidden");
}

function showElementById(id){
  document.getElementById(id).classList.remove("hidden");
}

drawCharacterList();