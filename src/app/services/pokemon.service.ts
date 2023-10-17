import { Injectable } from '@angular/core';
import { Result } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page : number, size: number = 40): Promise<Result[]>{
    if (page > 5) return [];

    const offset = size * (page - 1);
    const pageSize = Math.min(size, 151 - offset);
    if (pageSize <= 0) {
      return [];
    }

    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pageSize}&offset=${offset}`);
    const respJson = await resp.json();
    if (respJson.results.length > 0) {
      return respJson.results;
    }

    return [];
  }

  async getById(id:string):Promise<Pokemon> {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await resp.json();
  }

  async getDescription(id:string | number):Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto:any) =>  texto.language.name === "es")
    return texto.flavor_text;
  }
}
