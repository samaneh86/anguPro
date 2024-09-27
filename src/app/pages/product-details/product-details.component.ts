
import { CartComponent } from './../cart/cart.component';
import { CommonModule } from '@angular/common';
import { DomainName } from './../../utilities/pathtool';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from '../../DTOs/product/getProductsResultDto';
import { ProductService } from '../../services/product.service';
import { RelatedProductsComponent } from '../related-products/related-products.component';
import { ProductGalleryDto } from '../../DTOs/product/getProductGallreryResult';
import { GetCommentDto } from '../../DTOs/product/GetProductComments';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProductCommentDto } from '../../DTOs/product/AddProductCommentDto';
import { AuthService } from '../../services/auth.service';
import { AddItemToCartRequest } from '../../DTOs/cart/addItemToCartRequest';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RelatedProductsComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: ProductDto = null as any;
  domainName = DomainName;
  productGalleries: ProductGalleryDto[] = [];
  comments: GetCommentDto[] = [];
  commentForm: FormGroup = null as any;
  addComment: AddProductCommentDto = null as any;

  showCommentContainer: boolean = true;
  commentFirstName = "";
  commentLastName = "";
  resText = "";
  addItemToCart: AddItemToCartRequest = null as any;
  count = 1;
  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService, public authService: AuthService, public cartService: CartService) { }
  ngOnInit() {
    var id = parseInt(this.activatedRoute.snapshot.params['id']);

    /* getProductDetail */
    this.productService.getProductById(id).subscribe(res => {
      console.log("details: " + res.data);
      this.product = res.data
    })
    /* get Galleries */
    this.productService.getProductGallery(id).subscribe(res => {
      this.productGalleries = res.data;
      console.log("galleries:" + res.data)
    });

    /*getComments */
    this.productService.getProductComments(id).subscribe(res => {
      this.comments = res.data;
      console.log("comments: " + res.data);
    })

    /* addComment */
    this.commentForm = new FormGroup({
      text: new FormControl(null, [Validators.required])
    })
    /* getCurrentUser */
    this.authService.getCurrentUser().subscribe(res => {
      if (res == null)
        this.showCommentContainer = false;
      else {
        this.showCommentContainer = true;
        this.commentFirstName = res.firstName;
        this.commentLastName = res.lastName
      }
    }
    )
  }



  /*submitCommentForm*/
  submitComment() {
    this.addComment = new AddProductCommentDto(
      this.product.id,
      this.commentForm.controls['text'].value
    );
    this.productService.addProductComment(this.addComment).subscribe(res => {
      console.log(res.data.info);
      this.resText = res.data.info;
      this.commentForm.reset();
    })
  }

  /*setTopImageOfGallery */

  setTopImg(imageName: string) {
    this.product.productImage = imageName;

  }

  /* addToCount*/
  plus() {
    this.count += 1;
  }
  /* minusFromCount*/
  minus() {
    if (this.count >= 2)
      this.count -= 1;
  }

  /*AddItemToCart*/
  addToCart() {
    this.addItemToCart = new AddItemToCartRequest(
      this.product.id,
      this.count
    );
    this.cartService.addItemToCart(this.addItemToCart).subscribe(res => {
      if (res.status == "Success")
        console.log(res.data);
      console.log(res.data.message)
      this.cartService.setCurrentCart(res.data.res)
    });



  }
}
