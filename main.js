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

  form.reset();
  document.getElementById("characters").classList.remove("hidden");
  form.classList.add("hidden");
  draw();
  drawCharacterList();
  

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

drawCharacterList();