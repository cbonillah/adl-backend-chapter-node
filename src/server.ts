import axios, { AxiosError } from 'axios';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Express, Request, Response } from 'express';
import { Chain } from './chain';

import { EvolutionChain } from './evolution-chain';
import { PokemonEvolution } from './pokemon-evolution';
import { PokemonInfo } from './pokemon-info';

const SERVER_PORT = process.env.SERVER_PORT;
const POKEMON_API_URI = process.env.POKEMON_API_URI;

export class Server {
	private app: Express;

	constructor() {
		this.app = express();

		this.app.use(cors());

		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));

		this.app.get('/pokemon/:pokemon_name', (req, res) => this.handleRequest(req, res));
	}

	public start(): void {
		console.log(`SERVER LISTENING ON PORT ${SERVER_PORT}`);
		this.app.listen(SERVER_PORT);
	}

	private handleRequest(req: Request, res: Response) {
		this.fetchPokemonData(req.params.pokemon_name)
			.then(info => this.fetchPokemonEvolutionChain(info.evolution_chain.url))
			.then(evolutionChain => this.getPokemonEvolutions(evolutionChain.chain))
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
	}

	private fetchPokemonData(pokemon: string): Promise<PokemonInfo> {
		console.log('Fetching the pokemon species data...');
		return axios.get<PokemonInfo>(`${POKEMON_API_URI}/pokemon-species/${pokemon}`)
			.then(response => response.data);
	}

	private fetchPokemonEvolutionChain(chain: string): Promise<EvolutionChain> {
		console.log('Fetching the pokemon evolution chain data ...');
		return axios.get<EvolutionChain>(chain)
			.then(response => response.data);
	}

	private getPokemonEvolutions(chain: Chain): PokemonEvolution {
		return {
			name: chain.species.name,
			evolutions: chain.evolves_to.map(evolution => this.getPokemonEvolutions(evolution))
		};
	}

}
