import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from 'src/app/interfaces/pokeapi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tarjeta-mobile-pokemon',
  templateUrl: './tarjeta-mobile-pokemon.component.html',
  styleUrls: ['./tarjeta-mobile-pokemon.component.scss']
})
export class TarjetaMobilePokemonComponent {

  constructor(private pokemonService : PokemonService) {
  }

  ngOnChanges(): void {
    this.extraerInformacion()
  }

  @Input() data?:Result;
  @Input() seleccionado:boolean=false;
  @Output() clickeado = new EventEmitter<string>();
  @Input() pokemon?: Pokemon;

  id : string = "0";

  extraerInformacion()
  {
      if(this.data && this.data.url !== "")
      {
        this.id = this.data.url.substring(34,this.data.url.length -1)
        return
      }

      if(this.pokemon)
      {
        this.id = this.pokemon.species.url.substring(42,this.pokemon.species.url.length -1);
        this.data = {
          name: this.pokemon.species.name,
          url:""
        }
      }
  }

}
