import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id:               new FormControl(''),
    superhero:        new FormControl('',{ nonNullable : true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });


  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},

  ]

  get currentHero(): Hero{
    const hero= this.heroForm.value as Hero;


    return hero
  }

  constructor ( private heroServices : HeroService){}


  onSumit(){
    if( this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroServices.updateHero(this.currentHero)
      .subscribe(hero=>{
        // TODO: mostrar snackbar
      });

      return
    }

    this.heroServices.addHero(this.currentHero)
    .subscribe(hero => {
        // TODO: mostrar snackbar, y nevegar a /hero/edit hero.id
      
    })
    // this.heroServices.updateHero(  )
    
  }

}
