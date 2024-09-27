export class GetProductResult {
    constructor(
        public data: GetProductResultDto,
        public status: string) { }
}


export class GetProductResultDto {
    constructor(
        public products: ProductDto[],
        public pagingInfo: pagingDto,

    ) { }
}



export class ProductDto {
    constructor(
        public id: number,
        public productName: string,
        public productImage: string,
        public price: number,
        public shortDescription: string,
        public description: string,
        public isSpecial: boolean,
        public isExists: boolean



    ) {

    }
}



export class pagingDto {
    constructor(
        public pageId: number,

        public countOfProductsInEachPage: number,
        public countOfTotalProducts: number


    ) {

    }

}