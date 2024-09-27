import { CartService } from './../../services/cart.service';
import { AddItemToCartRequest } from './../../DTOs/cart/addItemToCartRequest';
import { DomainName } from './../../utilities/pathtool';
import { Component, Input } from '@angular/core';
import { ProductDto } from '../../DTOs/product/getProductsResultDto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  domainName = DomainName;
  @Input("product") public product: ProductDto = null as any;
  addItemtoCart: AddItemToCartRequest = null as any;
  count: number = 1;
  constructor(public cartService: CartService) {

  }
  ngOnInit() {
    console.log("product is", this.product)
  }
  /*addItemToCart */
  addToCart(productId: number) {
    this.addItemtoCart = new AddItemToCartRequest(

      productId,
      this.count,
    );
    this.cartService.addItemToCart(this.addItemtoCart).subscribe(res => {
      console.log(res.data);
      this.cartService.setCurrentCart(res.data.res);
    });


    
  }
}
