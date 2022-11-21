import chalk from 'chalk';
import inquirer from 'inquirer';

let pokemon_name;
const stats = {};
const stat_tracker = [];

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

function color_wraper(stats_key){
    const value = stats[stats_key];
    if(value >= 90){
        return chalk.green(`${value} (good)`);
    }else if( value >= 70){
        return chalk.yellow(`${value} (alright)`);
    }else{
        return chalk.red(`${value} (bad)`);
    }
}

function total_base_stats(){
    const total = stats["hp"]+stats["attack"]+stats["defense"]+stats["special-attack"]+stats["special-defense"]+stats["speed"];
    if(total >= 500){
        return chalk.green(`${total} (good)`);
    }else if( total >= 400){
        return chalk.yellow(`${total} (alright)`);
    }else{
        return chalk.red(`${total} (meh)`);
    }
}
function nextBiggest(arr) {
    arr.sort((a,b)=>b-a);
    return arr[1];
}

function stat_focus(){
    const hp = stats["hp"];
    const attack = stats["attack"];
    const defense = stats["defense"];
    const sp_attack = stats["special-attack"];
    const sp_defense = stats["special-defense"];
    const speed = stats["speed"];

    const focus_group = [hp, attack, defense, sp_attack, sp_defense, speed].sort((a,b)=>b-a);
    focus_group.splice(2);

    const result = [];
    for(let val of focus_group){
        switch(val){
            case hp:
                result.push("hp");
                break;
            case attack:
                result.push("attack");
                break;
            case defense:
                result.push("defense");
                break;
            case sp_attack:
                result.push("special-attack");
                break;
            case sp_defense:
                result.push("special-defense");
                break;
            case speed:
                result.push("speed");
                break;
        }
    }
    return result;
}

async function form_response(){
    console.log(`
name:               ${stats["name"]}
id:                 ${stats["id"]}
types:              ${stats["types"]}

hp:                 ${color_wraper("hp")}
attack:             ${color_wraper("attack")}
defense:            ${color_wraper("defense")}
spedial attack:     ${color_wraper("special-attack")}
special defense:    ${color_wraper("special-defense")}
speed:              ${color_wraper("speed")}

total:              ${total_base_stats()}

focus:              ${stat_focus()}
    `);
}


/**
 *  main function execution
 */
console.clear();
await ask_pokemon();
await get_pokemon();
console.clear();
await form_response();