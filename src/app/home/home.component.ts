import {Component, Inject, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {expand, flyInOut} from "../animations/app.animation";

@Component({
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
    expand(),
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              @Inject('BaseURL') public baseURL:any) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish );
    this.promotion = this.promotionservice.getFeaturedPromotion();
  }

}

