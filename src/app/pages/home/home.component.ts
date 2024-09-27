import { SliderComponent } from './slider/slider.component';
import { Component } from '@angular/core';
import { MostPopularProductsComponent } from './most-popular-products/most-popular-products.component';
import { SpecialProductsComponent } from './special-products/special-products.component';
import { NewproductsComponent } from './newproducts/newproducts.component';
import { BrandsComponent } from './brands/brands.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent,MostPopularProductsComponent,SpecialProductsComponent,NewproductsComponent,LatestNewsComponent,BrandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
