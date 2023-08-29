import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from "rxjs";
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


}