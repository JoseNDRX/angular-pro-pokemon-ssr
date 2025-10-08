import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal} from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';

import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [ PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

  private porkemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1'),
      map( page => ( isNaN(+page) ? 1 : +page) ),
      map( page => Math.max(1, page))
    )
  );

  // public isloading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable});
  // });

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(console.log);
    // console.log(this.currentPage());

    this.loadPokemons();
    // setTimeout(() => {
    //   this.isloading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {

    let pageToLoad = this.currentPage()! + page;
    pageToLoad = Math.max(1, pageToLoad);
    this.porkemonsService.loadPage(pageToLoad)
    .pipe(
      tap(() =>
        this.router.navigate( [], { queryParams: {page: pageToLoad} } )
      ),
      tap(() =>
        this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
    )
    .subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }

  // ngOnDestroy(): void {
  //   console.log('destroyed');
  //   this.$appState.unsubscribe();
  // }


}
