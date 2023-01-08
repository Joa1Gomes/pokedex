
const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const nextBtn = document.querySelector('.btn-next')
const prevBtn = document.querySelector('.btn-prev')

let pesquisaPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pesquisaPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not Found";
        pokemonNumber.innerHTML = '';
    }
    input.value = "";
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

nextBtn.addEventListener('click', () => {
    pesquisaPokemon += 1;
    renderPokemon(pesquisaPokemon);
});

prevBtn.addEventListener('click', () => {
    
    if(pesquisaPokemon > 1){
    pesquisaPokemon -= 1;
    renderPokemon(pesquisaPokemon);
    }
});

  
renderPokemon(pesquisaPokemon);
