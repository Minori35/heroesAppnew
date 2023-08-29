import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs";
import { Hero } from '../../interfaces/hero.interface';
@Component({
  selector: 'app-hero-pages',
  templateUrl: './hero-pages.component.html',
  styles: [
  ]
})
export class HeroPagesComponent implements OnInit{

  public hero? : Hero;
  constructor(
    private heroSerice : HeroService,
    private activateRoute : ActivatedRoute,
    private router: Router,
    ){}
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.heroSerice.getHeroById(id) ),
      ).subscribe(hero =>{
        if(!hero) return this.router.navigate(['/heroes/list']);
        
        this.hero = hero;
        console.log("🚀 ~ file: hero-pages.component.ts:28 ~ HeroPagesComponent ~ ngOnInit ~ this.hero:", this.hero)

        return
      })
  }
}
