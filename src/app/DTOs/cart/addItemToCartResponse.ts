import { GetItemCart } from "./getItemCart";

export class AddItemToCartResponse{
constructor(
   public data:{message:string,res:GetItemCart[]},
   public status:string
){

}
}