
import { Component } from '@angular/core';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ProductService } from '../../services/product.service';
import { ProductDto, pagingDto } from '../../DTOs/product/getProductsResultDto';
import { CommonModule } from '@angular/common';
import { CategoryDto } from '../../DTOs/product/getProductCategoriesResult';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ProductFiltertRequest } from '../../DTOs/product/productFilterRequest';
import { FormsModule } from '@angular/forms';
import { ProductOrder } from '../../DTOs/product/productorder';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SingleProductComponent, CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: ProductDto[] = [];

  categories: CategoryDto[] = [];


  /*paging*/
  pagers: number[] = [];
  startPager = 0;
  pageId = 0;
  endPager = 0;
  productFilter: ProductFiltertRequest = new ProductFiltertRequest(1, '', 0, 0, [], null as any);
  categoriesArray: number[] = [];
  constructor(public productService: ProductService, public activatedroute: ActivatedRoute, public router: Router) {

  }
  ngOnInit() {
    this.getAllProducts();





    /*get Categories*/
    this.productService.getAllProductCategories().subscribe(res => {
      console.log(res.data);
      this.categories = res.data;
    });
  }

  /* getAllProducts */
  getAllProducts(id = 1) {

    this.pagers = [];
    this.productService.getAllProducts(this.productFilter).subscribe(res => {

      if (res.status == "Success") {
        this.products = res.data.products;
        console.log("product: ", res.data.products)
        console.log("pageInfo: ", res.data.pagingInfo)

        /*pager */
        this.pageId = res.data.pagingInfo.pageId
        this.startPager = res.data.pagingInfo.pageId - 3 < 0 ? 1 : (res.data.pagingInfo.pageId) - 2;
        var x = Math.floor(res.data.pagingInfo.countOfTotalProducts / res.data.pagingInfo.countOfProductsInEachPage);
        console.log("x", x)
        this.endPager = (res.data.pagingInfo.pageId + 3 > x) ? x : res.data.pagingInfo.pageId + 3;
        console.log("startPage", this.startPager);
        console.log("endPage", this.endPager);
        for (let i = this.startPager; i <= this.endPager; i++) {
          this.pagers.push(i)
        }
        console.log("pager:", this.pagers)


      }


    });
  }


  /*sendPageIdToServer*/
  getPageId(id: number) {

    this.productFilter.pageId = id;
    this.router.navigate(['product'], {
      queryParams: {
        pageId: id,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    });
    this.getAllProducts(id);


  }

  /*getProductBySerach*/
  getProduct(value: string) {
    this.productFilter.title = ""
    this.productFilter.title = value;
    this.router.navigate(['product'], {
      queryParams: {
        pageId: this.productFilter.pageId,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    });
    this.getAllProducts();
  }

  /*setMaxPrice*/
  setMaxPrice(event: any) {
   
    this.productFilter.maxPrice = event.target.value;
    this.router.navigate(['product'], {
      queryParams: {
        pageId: this.productFilter.pageId,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    });
    this.getAllProducts();
  }

  /*setMinPrice*/
  setMinPrice(event: any) {
    this.productFilter.title = ""
    this.productFilter.minPrice = event.target.value;
    this.router.navigate(['product'], {
      queryParams: {
        pageId: this.productFilter.pageId,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    });
    this.getAllProducts();
  }

  /*setOrder*/
  setOrder(event: any) {
  
    var value = event.target.value
    if (value == 1)
      this.productFilter.productOrder = ProductOrder.Asc;
    if (value == 2)
      this.productFilter.productOrder = ProductOrder.Desc;
    this.router.navigate(['product'], {
      queryParams: {
        pageId: this.productFilter.pageId,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    });
    this.getAllProducts();
  }

  /*setcategories*/
  setCategories(event: any) {

    var value = parseInt(event.target.value);
    if (event.target.checked) {
      this.categoriesArray.push(value);
      this.router.navigate(['product'], {
        queryParams: {
          pageId: this.productFilter.pageId,
          title: this.productFilter.title == "" ? "" : this.productFilter.title,
          minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
          maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
          productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
          categories: this.categories.length == 0 ? [] : this.categories
        }
      });
    }
    else
      this.categoriesArray = this.categoriesArray.filter(x => x !== value)
    this.productFilter.categories = this.categoriesArray;
    this.router.navigate(['product'], {
      queryParams: {
        pageId: this.productFilter.pageId,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    });
    this.getAllProducts();
  }


  setMinPriceUrl() {
    this.router.navigate(['product'], {
      queryParams: {
        pageId: this.productFilter.pageId,
        title: this.productFilter.title == "" ? "" : this.productFilter.title,
        minPrice: this.productFilter.minPrice == 0 ? 0 : this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice == 0 ? 0 : this.productFilter.maxPrice,
        productOrder: this.productFilter.productOrder == null ? null : this.productFilter.productOrder,
        categories: this.categories.length == 0 ? [] : this.categories
      }
    })
   
  }



}
