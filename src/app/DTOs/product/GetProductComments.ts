export class GetProductComments {
    constructor(
      public  data:GetCommentDto[],
      public  status: string

    ) { }
}

export class GetCommentDto{
constructor(
public firstName:string,
public lastName:string,

public text:string,
public date:string,
public time:string,

){

}
}