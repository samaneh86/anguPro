
import { RemoveItemResponse } from './../DTOs/cart/removeItemResponse';
import { AddItemToCartResponse } from './../DTOs/cart/addItemToCartResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddItemToCartRequest } from '../DTOs/cart/addItemToCartRequest';
import { GetItemCart, GetItemCartResponse } from '../DTOs/cart/getItemCart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentCart: BehaviorSubject<GetItemCart[]> = new BehaviorSubject<GetItemCart[]>(null as any);
  constructor(public http: HttpClient) {

  }
  getCurrentCart() {
    return this.currentCart;
  }
  setCurrentCart(value: GetItemCart[]) {
    this.currentCart.next(value);
  }

  public addItemToCart(data: AddItemToCartRequest): Observable<AddItemToCartResponse> {
    return this.http.post<AddItemToCartResponse>('/Cart/add-item-to-cart', data);
  }

  public getItemsCart(): Observable<GetItemCartResponse> {
    return this.http.get<GetItemCartResponse>('/Cart/get-items-cart');
  }

  /*removeItemFromcart*/
  removeItem(productId: number): Observable<RemoveItemResponse> {
    return this.http.get<RemoveItemResponse>("/Cart/remove-item/" + productId)
  }
}
