import {Component, OnInit, Inject} from '@angular/core';
import {Dish} from  '../shared/dish';
import {DISHES} from "../shared/dishes";
import { DishService } from '../services/dish.service';
import {expand, flyInOut} from '../animations/app.animation';



// const DISHES: Dish[] = [
//   {id: '0',
//     name: 'Uthapizza',
//     image: 'assets/images/uthappizza.png',
//     category: 'mains',
//     featured: true,
//     label: 'Hot',
//     price: '4.99',
//     description: 'Delicious',
//   },
//   {id: '1',
//     name: 'Zuchipakoda',
//     image: 'assets/images/zucchipakoda.png',
//     category: 'appetizer',
//     featured: false,
//     label: '',
//     price: '1.99',
//     description: 'Delicious',
//   }
//
// ];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
    expand()

  ]
})








export class MenuComponent implements OnInit {



  dishes!: Dish[];
 // selectedDish!: Dish;

  // onSelect(dish: Dish){
  //   this.selectedDish = dish;
  //
  // }
 constructor(private dishService: DishService,
             @Inject('BaseURL') public baseURL:any) { }

 ngOnInit() {
   this.dishService.getDishes()
     .subscribe(dishes => this.dishes = dishes);
   this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);



 }






}
