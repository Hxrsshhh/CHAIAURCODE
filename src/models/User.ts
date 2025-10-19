import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IUser{
  email:string;
  password:string;
  username:string;
  _id:mongoose.Types.ObjectId;
  createdAt:Date;
  updatedAt:Date;
}

const userSchema = new mongoose.Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  username:{type:String,required:true},
},
{timestamps:true}
)

userSchema.pre("save",async function (next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
  }
  next();
})


const User = mongoose.models?.User || mongoose.model("User",userSchema);

export default User ;