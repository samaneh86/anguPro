export class GetProductCategoriesResult{
constructor(
public data:CategoryDto[],
public status:string

){}
}

export class CategoryDto{
    constructor(
public categoryId:number,
public title:string

    ){}
}