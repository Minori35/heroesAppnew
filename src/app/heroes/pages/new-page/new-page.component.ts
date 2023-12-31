import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap , tap, filter} from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

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

  constructor ( 
    private heroServices : HeroService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private snackbar : MatSnackBar,
    private dialog: MatDialog){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroServices.getHeroById(id)),
    ).subscribe(hero => {

      if(!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return
    })
  }


  onSumit(){
    if( this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroServices.updateHero(this.currentHero)
      .subscribe(hero=>{
        // TODO: mostrar snackbar
        this.showSnackBar(`${hero.superhero} updated!`)
      });

      return
    }

    this.heroServices.addHero(this.currentHero)
    .subscribe(hero => {
        // TODO: mostrar snackbar, y nevegar a /hero/edit hero.id
        this.router.navigate(['/hero/edit', hero.id] )
        this.showSnackBar(`${hero.superhero} Created!`)

      
    })
    // this.heroServices.updateHero(  )
    
  }

  onConfirmHero(){
    if( !this.currentHero.id) throw Error("Hero id is required")
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean )=>  result),
      switchMap( ( ) => this.heroServices.deleteHeroById(this.currentHero.id) ),
      filter((wasDelite: boolean )=>  wasDelite),
    ).subscribe(()=>{
         this.router.navigate(['/heroes'])

    })

    // dialogRef.afterClosed().subscribe(result => {
    //   if(! result) return

    //   this.heroServices.deleteHeroById(this.currentHero.id)
    //   .subscribe(result => {
    //     if(result)
    //     this.router.navigate(['/heroes'])
    //   })

    
    // });
  }
  

  showSnackBar(message : string){
    this.snackbar.open(message, 'done',{
      duration : 2500,
    })
  }

}
