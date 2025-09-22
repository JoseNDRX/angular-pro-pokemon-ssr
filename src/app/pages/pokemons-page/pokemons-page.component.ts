import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [ PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

  private porkemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  // public isloading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable});
  // });

  ngOnInit(): void {
    this.loadPokemons();
    // setTimeout(() => {
    //   this.isloading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {
    this.porkemonsService.loadPage(page).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }

  // ngOnDestroy(): void {
  //   console.log('destroyed');
  //   this.$appState.unsubscribe();
  // }


}
