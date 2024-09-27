import { GetItemCart } from "./getItemCart";

export class RemoveItemResponse{
    constructor(
        public data:{message:string,res:GetItemCart[]},
        public status:string
    ){}
}