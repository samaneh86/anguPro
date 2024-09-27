import { AddProductCommentDto} from './../DTOs/product/AddProductCommentDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProductResult, GetProductResultDto, ProductDto } from '../DTOs/product/getProductsResultDto';
import { Observable } from 'rxjs';
import { GetProductCategoriesResult } from '../DTOs/product/getProductCategoriesResult';
import { GetProductByIdResult } from '../DTOs/product/getProductbyIdResult';
import { GetRelatedProductsResult } from '../DTOs/product/getRelatedProductsResult';
import { GetProductgalleryResult } from '../DTOs/product/getProductGallreryResult';
import { GetProductComments } from '../DTOs/product/GetProductComments';
import { AddProductCommentResult } from '../pages/product/AddProductCommentResult';
import { ProductFiltertRequest } from '../DTOs/product/productFilterRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }


   /*getAllProducts*/
  getAllProducts(productFilter:ProductFiltertRequest): Observable<GetProductResult> {
    var httpParams=new HttpParams();
   
    return this.http.post<GetProductResult>("/product/get-all-products",productFilter)
  }

  /*getCategories*/

  getAllProductCategories(): Observable<GetProductCategoriesResult> {
    return this.http.get<GetProductCategoriesResult>("/product/get-all-product-categories")
  }

 /*getPoductById*/
  getProductById(productId: number): Observable<GetProductByIdResult> {
    return this.http.get<GetProductByIdResult>("/product/get-product-by-id/" + productId)
  }

   /*getRelatedproducts*/
  getRelatedProducts(productId: number): Observable<GetRelatedProductsResult> {
    return this.http.get<GetRelatedProductsResult>("/product/get-related-products/" + productId)
  }

   /*getProductGalleries*/
  getProductGallery(productId: number): Observable<GetProductgalleryResult> {
    return this.http.get<GetProductgalleryResult>("/product/get-product-gallery/" + productId)
  }


/*GetComment*/
  getProductComments(productId: number): Observable<GetProductComments> {
    return this.http.get<GetProductComments>("/product/get-product-comments/" + productId)
  }


  /*AddComment */
  addProductComment(commentData:AddProductCommentDto): Observable<AddProductCommentResult> {
    return this.http.post<AddProductCommentResult>("/product/add-product-comment" ,commentData)
  }
}
