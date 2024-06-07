import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface User{
    username:string
    email:string
    password:string
}

interface userMethods{
    compare(password:string):Promise<boolean>
    accessToken():string
}
const user = new Schema<User,{},userMethods>({
    username: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
)

user.pre("save",async function(next){
    // encrypts password just before saving document
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,8);
})

user.methods.compare=async function(password:string){
    return await bcrypt.compare(password,this.password);
}

user.methods.accessToken=function(){
    // tokenising using JWT token with only user id parameter with time limit
    const access_token=jwt.sign({
        id:this._id,
    },process.env.ACCESS_TOKEN as string);
    return access_token;
}


export default mongoose.model("users",user);