import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Result } from 'src/app/interfaces/pokeapi'
import { Pokemon } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private pokemonService:PokemonService){}
  @ViewChild ('tarjetas') tarjetasElement!:ElementRef;

  listaPokemon: Result[] = [];
  pagina : number = 1;
  pokemonSeleccionado?:Pokemon;

  ngOnInit(): void {
    this.cargarLista(),
    this.pokemonService.getById("1");
  }

  async cargarLista()
  {
    this.listaPokemon = [...this.listaPokemon, ... await this.pokemonService.getByPage(this.pagina)];
    this.pagina++;
  }

  onScroll(e:any){
    if(
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
        )
        === e.srcElement.scrollHeight){
        this.cargarLista();
      }
  }

  async tarjetaClickeada(id:string) {
     this.pokemonSeleccionado = await this.pokemonService.getById(id);
     console.log(this.pokemonSeleccionado);
  }
}
