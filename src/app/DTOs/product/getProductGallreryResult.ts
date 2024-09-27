export class GetProductgalleryResult {
    constructor(
        public data:ProductGalleryDto[],
        public status: string

    ) {

    }
}

export class ProductGalleryDto{
    constructor(public imageName:string ){}
       

}