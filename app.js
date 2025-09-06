const form = document.getElementById("form");
const container = document.getElementById("pokemonList");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload

  const offset = parseInt(document.getElementById("offset").value) || 0;
  const limit = parseInt(document.getElementById("limit").value) || 9;

  fetchPokemons(offset, limit);
});

function fetchPokemons(offset, limit) {
  container.innerHTML = ""; // clear previous results

  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      data.results.forEach(pokemon => {
        fetchPokemonDetails(pokemon.url);
      });
    })
    .catch(error => console.error("Error fetching Pokémon list:", error));
}

function fetchPokemonDetails(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const div = document.createElement("div");
      div.classList.add("pokemon-List");

      const abilitiesList = document.createElement("ul");
      data.abilities.forEach(a => {
        const li = document.createElement("li");
        li.textContent = a.ability.name;
        abilitiesList.appendChild(li);
      });

      div.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h3>Abilities:</h3>
      `;

      div.appendChild(abilitiesList);
      container.appendChild(div);
    })
    .catch(error => console.error("Error fetching Pokémon details:", error));
}
