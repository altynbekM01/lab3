import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes' ;
import {Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import  {map, catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";
// import {ProcessHTTPMsgService} from "./process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class DishService {




  constructor(private http: HttpClient) { }


  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL+'dishes');
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes/'+ id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }
  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe();

  }






  // getDishes(): Promise<Dish[]> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES), 2000);
  //   });
  // }
  //
  // getDish(id: string): Promise<Dish> {
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id.toString() === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedDish(): Promise<Dish> {
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  //   });




}
