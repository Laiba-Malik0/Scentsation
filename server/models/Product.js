import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
name:{
type:String,
required:true
},

brand:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

description:{
type:String,
required:true
},

category:{
type:String,
required:true
},

imageUrl:{
type:String,
required:true
},

countInStock:{
type:Number,
required:true
},

isBlocked:{
type:Boolean,
default:false
}

},
{
timestamps:true
}
);

export default mongoose.model("Product",productSchema);
