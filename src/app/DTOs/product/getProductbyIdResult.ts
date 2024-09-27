import { ProductDto } from "./getProductsResultDto";

export class GetProductByIdResult {
    constructor(
       public data: ProductDto,
        public status: string

    ) {

    }
}