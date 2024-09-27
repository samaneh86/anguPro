import {  ProductOrder } from "./productorder";

export class ProductFiltertRequest {
    constructor(
        public pageId: number,

        public title:string,
        public minPrice:number,
        public maxPrice:number,
        public categories:number[],
        public productOrder:ProductOrder


    ) { }
}