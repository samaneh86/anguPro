import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { GetItemCart } from '../../DTOs/cart/getItemCart';
import { CommonModule } from '@angular/common';
import { DomainName } from '../../utilities/pathtool';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  domainName = DomainName
  cartItems: GetItemCart[] = null as any;
  total: number = 0
sum=0;
  constructor(public cartService: CartService) { }
  ngOnInit() {
   

    this.cartService.getCurrentCart().subscribe(res => {
      this.cartItems = res;
      this.total=0;
      this.sum=0;
      for (let item of this.cartItems)
        this.total= this.total+item.priceInEachRow;
      this.sum+=this.total;
    });



  }
  /*removeItemFromcart*/
  removeItem(productId: number) {
    this.cartService.removeItem(productId).subscribe(res => {
      if (res.status == "Success") {
        console.log(res.data.message);
        console.log(res.data.res);
        this.cartService.setCurrentCart(res.data.res)
      }

    })
  }

}




