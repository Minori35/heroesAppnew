import { Component } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor(
    private heroService : HeroService
  ){}

  public searchInput = new FormControl('');
  

}
