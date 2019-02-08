import axios, { AxiosError } from 'axios';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotEnv from 'dotenv';
import * as express from 'express';
import { Request, Response } from 'express';
import { Chain } from './chain';
import { EvolutionChain } from './evolution-chain';
import { PokemonEvolution } from './pokemon-evolution';
import { PokemonInfo } from './pokemon-info';

dotEnv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const POKEMON_API_URI = process.env.POKEMON_API_URI;

const app = express();

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get('/pokemon/:pokemon_name', (req: Request, res: Response) => {
	fetchPokemonData(req.params.pokemon_name)
		.then(
			info => fetchPokemonEvolutionChain(info.evolution_chain.url)
		)
		.then(evolutionChain => getPokemonEvolutions(evolutionChain.chain))
		.then(pokemon => res.send(pokemon))
		.catch(error => {
			if ((<AxiosError>error).response) {
				res.status((<AxiosError>error).response.status);
				res.send((<AxiosError>error).response.data);
			} else {
				console.error(error);
				res.status(500);
				res.send('Unknown error');
			}
		});
})

app.listen(SERVER_PORT);
console.log(`SERVER LISTENING ON PORT ${SERVER_PORT}`)

function fetchPokemonData(pokemon: string): Promise<PokemonInfo> {
	console.log('Fetching the pokemon species data...');
	return axios.get<PokemonInfo>(`${POKEMON_API_URI}/pokemon-species/${pokemon}`)
		.then(response => response.data);
}

function fetchPokemonEvolutionChain(chain: string): Promise<EvolutionChain> {
	console.log('Fetching the pokemon evolution chain data ...');
	return axios.get<EvolutionChain>(chain)
		.then(response => response.data);
}

function getPokemonEvolutions(chain: Chain): PokemonEvolution {
	return {
		name: chain.species.name,
		evolutions: chain.evolves_to.map(getPokemonEvolutions)
	};
}