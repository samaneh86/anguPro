
export class GetItemCartResponse{
    constructor(
public status:string,
public data:GetItemCart[]

    ){}
}
export class GetItemCart {
    constructor(
        public productId:number,
        public productName: string,
        public productImage: string,
        public count: number,
        public productPrice: number,
        public priceInEachRow: number,
       
    ) {

    }
}