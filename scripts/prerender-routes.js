


( async() =>{
  const fs = require('fs');
  const TOTAL_POKEMONS = 20;
  const TOTAL_PAGES = 5;
  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, ( _, i ) => i + 1 );

  let fileContent = pokemonIds.map(
    id => `/pokemons/${ id }`
  ).join( '\n')

  for ( let index = 1; index <= TOTAL_PAGES; index++ ) {
    fileContent += `\n/pokemons/page/${ index }`
  }

  const pokemonNameList = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }`)
  .then( res => res.json() );

  console.log(pokemonNameList);

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${ pokemon.name }`
  ).join( '\n');

  fs.writeFileSync('routes.txt', fileContent)
  console.log(fileContent);

})();
