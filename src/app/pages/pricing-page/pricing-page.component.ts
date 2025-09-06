import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // document.title = 'Pricing Page'; // eso genera un error en el lado del servidor
    // console.log(document);

    // if(!isPlatformServer(this.platform)) {
    //   document.title = 'Pricing Page'; // para ejecutar solo en el cliente
    // };
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Esta es la pricing page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Yo, hoy' });
  //

}
}
