export class CheckAuthUserResult{
    constructor(
        public status:string,
        public data:CheckAuthUserDto
    ){}

}
export class CheckAuthUserDto{
constructor(
    public id:number,
    public firstName:string,
    public lastName:string,
    public email:string,
public address:string
){}
}