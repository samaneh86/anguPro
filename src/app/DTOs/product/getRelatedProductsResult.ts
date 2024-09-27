import { ProductDto } from "./getProductsResultDto";

export class GetRelatedProductsResult{
constructor(public data:ProductDto[],public status:string){}
}