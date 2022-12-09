import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: number): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }
  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }
   getFeaturedPromotion(): Promotion {
     return PROMOTIONS.filter((promotion) => promotion.featured)[0];
   }
}


