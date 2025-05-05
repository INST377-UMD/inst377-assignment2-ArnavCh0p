const carouselContainer = document.getElementById("carousel");
const breedButtons = document.getElementById("breedButtons");
const breedInfoBox = document.getElementById("breedInfo");

const breedName = document.getElementById("breedName");
const breedDescription = document.getElementById("breedDescription");
const lifeSpan = document.getElementById("lifeSpan");

let allBreeds = [];

async function loadCarouselImages() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
  const data = await res.json();

  carouselContainer.innerHTML = '';
  data.message.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.classList.add("slide");
    carouselContainer.appendChild(img);
  });

  new SimpleSlider('carousel');
}

async function loadBreeds() {
  const res = await fetch('https://api.thedogapi.com/v1/breeds');
  allBreeds = await res.json();

  allBreeds.forEach(breed => {
    const btn = document.createElement("button");
    btn.classList.add("custom-btn");
    btn.textContent = breed.name;
    btn.onclick = () => showBreedInfo(breed.name);
    breedButtons.appendChild(btn);
  });
}

function showBreedInfo(name) {
  const breed = allBreeds.find(b => b.name.toLowerCase() === name.toLowerCase());
  if (breed) {
    breedName.textContent = breed.name;
    breedDescription.textContent = breed.temperament || "No description available.";
    const lifespanParts = breed.life_span.split(" ")[0].split("-");
    lifeSpan.textContent = lifespanParts.join(" – ");
    breedInfoBox.style.display = "block";
  } else {
    alert("Breed not found.");
  }
}

if (annyang) {
  annyang.addCommands({
    'load dog breed *breed': function(breed) {
      showBreedInfo(breed);
    }
  });
}

loadCarouselImages();
loadBreeds();
