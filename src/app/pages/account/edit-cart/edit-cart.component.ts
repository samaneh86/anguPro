import { DomainName } from './../../../utilities/pathtool';
import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { GetItemCart } from '../../../DTOs/cart/getItemCart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-cart.component.html',
  styleUrl: './edit-cart.component.css'
})
export class EditCartComponent {
  cartItems: GetItemCart[] = null as any;
  domainName=DomainName;
  total=0;
  sum=0;
  constructor(public cartService: CartService) {

  }
  ngOnInit() {
    /*getCartItems*/
    this.cartService.getCurrentCart().subscribe(res => {
      this.cartItems = res;
      this.sum=0;
      this.total=0;
      for(let item of this.cartItems){
          
        this.total=item.priceInEachRow;
        this.sum+=this.total
      }
    })
  }


  /*deletItemOfcarts*/
  deleteItem(id: number) {
    this.cartService.removeItem(id).subscribe(res => {
      console.log(res);
      this.cartService.setCurrentCart(res.data.res);
      this.cartService.getCurrentCart().subscribe(res=>{
        this.cartItems=res;
        console.log(this.cartItems);

        })


      })
      
 
  }
}
