import chalk from 'chalk';
import inquirer from 'inquirer';

let pokemon_name;
const stats = {};

async function ask_pokemon() {
    const answers = await inquirer.prompt({
      name: 'pokemon_name',
      type: 'input',
      message: 'What is the pokemon you are looking for?',
      default() {
        return 'Pikachu';
      },
    });
  
    pokemon_name = answers.pokemon_name.toLowerCase();
    console.log(pokemon_name);
}

async function get_pokemon(){
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
    const pokemon = await res.json();

    const types = []
    for(let obj of pokemon.types){
        types.push(obj.type.name);
    }
    
    stats["name"] = pokemon_name;
    stats["id"] = pokemon.id;
    stats["types"] = types;
    stats["hp"] = pokemon.stats[0].base_stat; 
    stats["attack"] = pokemon.stats[1].base_stat; 
    stats["defense"] = pokemon.stats[2].base_stat; 
    stats["special-attack"] = pokemon.stats[3].base_stat; 
    stats["special-defense"] = pokemon.stats[4].base_stat; 
    stats["speed"] = pokemon.stats[5].base_stat; 
}


/**
 *  main function execution
 */
console.clear();
await ask_pokemon();
await get_pokemon();
await form_response();