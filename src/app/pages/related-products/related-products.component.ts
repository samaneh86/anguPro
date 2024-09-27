import { DomainName } from './../../utilities/pathtool';
import { ProductDto } from './../../DTOs/product/getProductsResultDto';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  relatedProducts: ProductDto[] = [];
  domainName=DomainName;
  @Input("productId") productId:number=0;
  constructor(public productService: ProductService) {

  }
  ngOnInit() {
    this.productService.getRelatedProducts(this.productId).subscribe(res => {
      this.relatedProducts = res.data;
      console.log(res)
      console.log(this.relatedProducts)
    })
  }
}
