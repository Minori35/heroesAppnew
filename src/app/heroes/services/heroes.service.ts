import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of , map} from "rxjs";
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/enviroments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {
    constructor(private httpclient : HttpClient) { }
    
    private baseUrl: string = enviroments.baseUrl;

    getHeroes(): Observable<Hero[]>{
        return this.httpclient.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById(id : string) : Observable<Hero| undefined>{
        return this.httpclient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(error =>  of(undefined))
            )
    }

    getSuggestions(query : string) :Observable<Hero[]>{
        return this.httpclient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)

    }

    addHero(hero :Hero) : Observable<Hero>{
        return this.httpclient.post<Hero>(`${this.baseUrl}/heroes`, hero)
    }

    updateHero(hero :Hero) : Observable<Hero>{
        if(!hero.id) throw Error('Hero id is requied')
        return this.httpclient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
    }

    deleteHeroById(id :string) : Observable<boolean>{
        return this.httpclient.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError( err => of(false)),
                map( resp => true)
            );
    }
}