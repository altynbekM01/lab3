// import {Component, Inject, Input, OnInit} from '@angular/core';
// import {Dish} from "../shared/dish";
// import { DishService } from '../services/dish.service';
//
// import { Params, ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
// import { switchMap } from 'rxjs/operators';
//
//
//
// @Component({
//   selector: 'app-dishdetail',
//   templateUrl: './dishdetail.component.html',
//   styleUrls: ['./dishdetail.component.scss']
// })
// export class DishdetailComponent implements OnInit {
//
//   dish!: Dish;
//   dishcopy!: Dish;
//
//
//
//
//   constructor(private dishservice: DishService,
//               private route: ActivatedRoute,
//               private location: Location,
//               @Inject('BaseURL') public baseURL:any)
//               { }
//
//
//   dishIds!: string[];
//   prev!: string;
//   next!: string;
//
//
//
//   ngOnInit() {
//     this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
//     this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
//       .subscribe(dish => this.dish = dish);
//
//     this.route.params
//       .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
//       .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id.toString()); });
//
//
//   }
//   setPrevNext(dishId: string) {
//     const index = this.dishIds.indexOf(dishId);
//     this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
//     this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
//   }
//
//
//   goBack(): void {
//     this.location.back();
//   }
//
//   onSubmit() {
//     this.dishcopy.comments.push(this.comment);
//     this.dishService.putDish(this.dishcopy)
//       .subscribe(dish => {
//           this.dish = dish; this.dishcopy = dish;
//         },
//         errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
//   }
//
//
// }

import { Component, Input, OnInit,Output,EventEmitter,Inject, ViewChild } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Params,ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
//import { trigger, state, style, animate, transition } from '@angular/animations';
import {flyInOut, visibility} from '../animations/app.animation';










@Component({

  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;',
  },
  animations: [
    flyInOut(),
    visibility()
  ],

  selector: 'app-dishdetail',
  //template: '<div class="child"><h3>Child Say{{message1}} <button class="button" (click)="sendMessage()">send Message</button></h3></div>',
  templateUrl: './dishdetail.component.html',



  styleUrls: ['./dishdetail.component.scss'],

  // animations: [
  //   trigger('visibility', [
  //     state('shown', style({
  //       transform: 'scale(1.0)',
  //       opacity: 1
  //     })),
  //     state('hidden', style({
  //       transform: 'scale(0.5)',
  //       opacity: 0
  //     })),
  //     transition('* => *', animate('0.5s ease-in-out'))
  //   ])
  // ],

})
export class DishdetailComponent implements OnInit {
  visibility = '';
  dishIds!: string[];
  prev!: string;
  next!: string;
  TheMessage:string="Test Event111";
  @Output() messageEvent = new EventEmitter<string>();



  @Input()  message1:string =" Ake!" ;
  secondMess="for test";
  @Input()  dish: Dish = new Dish;
  dishcopy!: Dish;
  errMess!:string;
  @ViewChild('cform') commentFormDirective!:any;
  comment!:Comment;
  commentForm!:FormGroup;



  creatForm()
  {
    this.commentForm = this.fb.group({
      author:['',Validators.required],
      rating:5,
      comment:['',Validators.required]
    });
    this.commentForm.valueChanges.subscribe(data=>this.onValueChanged(data));
  }
  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish=>{
          this.dish=dish;
          this.dishcopy=dish;
        }, errmess=>{this.dish,this.dishcopy,this.errMess=errmess}
      );
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: 1
    });
  }


  formErrors = {
    'author': '',
    'rating': 0,
    'comment': ''



  };



  validationMessages = {
    'author': {
      'required':      'author is required.',
      'minlength':     'author must be at least 2 characters long.',
      'maxlength':     'author cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'rating is required.',



    },
    'comment': {
      'required':      'commment is required.',



    }
  };
  onValueChanged( data?: any)
  {
    if(!this.commentForm) {return ;}
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        // @ts-ignore
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          // @ts-ignore
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              // @ts-ignore
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }



  }
  sendMessage()
  {
    this.messageEvent.emit(this.TheMessage);
  }
  constructor(private dishService:DishService,
              private route:ActivatedRoute,
              private location:Location,
              private fb:FormBuilder,
              @Inject('BaseURL') public baseURL:any,
  ) { }



  ngOnInit(): void {


    this.creatForm();
    // const id = +this.route.snapshot.params['id'];
    // this.dishService.getDish(id).then(theresult=>this.dish=theresult);
    this.dishService.getDishIds().subscribe(dishIDs=>this.dishIds=dishIDs);
    //    this.route.params.pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
    // .subscribe(dish=>{this.dish=dish;this.setPrevNext((dish.id.toString()));});
    // this.route.params
    //   .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    //   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id.toString()); },
    //     errmess => this.errMess = <any>errmess );
    this.route.params
      .pipe(switchMap((params: Params) =>  {this.visibility = 'hidden'; return this.dishService.getDish(+params['id']);}))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id.toString()); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess );


  }



  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1)% this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index +1)% this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }



}

