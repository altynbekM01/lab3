import {Component, OnInit} from '@angular/core';
import {Dish} from  '../shared/dish';
import {DISHES} from "../shared/dishes";
import { DishService } from '../services/dish.service';


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
  styleUrls: ['./menu.component.scss']
})








export class MenuComponent implements OnInit {

 dishes!: Dish[];
 selectedDish!: Dish;
  onSelect(dish: Dish){
    this.selectedDish = dish;

  }
 constructor(private dishService: DishService) { }

 ngOnInit() {
   this.dishService.getDishes()
     .then(dishes => this.dishes = dishes);

 }



}
