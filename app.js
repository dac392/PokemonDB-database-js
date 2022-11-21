import chalk from 'chalk';
import inquirer from 'inquirer';

let pokemon_name;
async function ask_pokemon() {
    const answers = await inquirer.prompt({
      name: 'pokemon_name',
      type: 'input',
      message: 'What is the pokemon you are looking for?',
      default() {
        return 'Pikachu';
      },
    });
  
    pokemon_name = answers.pokemon_name;
    console.log(pokemon_name);
}


/**
 *  main function execution
 */
console.clear();
await ask_pokemon();