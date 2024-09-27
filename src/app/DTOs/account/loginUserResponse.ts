export class loginUserResponse{
constructor(
public status:string,
public data:UserLoggedIn

){}
}

export class UserLoggedIn{
constructor(
public token:string,
public firstName:string,
public lastName:string,
public expire:number,
public id:number,
public email:string,
public address:string

){}
}