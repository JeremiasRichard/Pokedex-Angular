import { Type } from './../../interfaces/pokemon';
import { Component, Input, OnChanges } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detalle-pokemon',
  templateUrl: './detalle-pokemon.component.html',
  styleUrls: ['./detalle-pokemon.component.scss'],
})
export class DetallePokemonComponent implements OnChanges {
listaPokemon: any;
pokemonSeleccionado: any;
clickeado: any;
data: any;

async tarjetaClickeada(id:string) {
  this.pokemonSeleccionado = await this.pokemonService.getById(id);
  console.log(this.pokemonSeleccionado);
}
  constructor(private pokemonService: PokemonService) {}

  @Input() pokemon?: Pokemon;
  descripcion: string = '';

  ngOnChanges(): void {
    if (this.pokemon) {
      this.pokemonService.getDescription(this.pokemon.id).then((resp) => {
        this.descripcion = resp;
      });
    }
  }
}
