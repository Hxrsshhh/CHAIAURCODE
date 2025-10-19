import mongoose from 'mongoose';
export const VIDEO_DIMENSION ={
  width:1080,
  height:1920
} as const
export interface IVideo{
    _id:mongoose.Types.ObjectId;
    title:string;
    description:string;
    videoUrl:string;
    thumbnailUrl:string;
    controls?:boolean;
    transformation?:{
      width:number,
      height:number
    }
    quality?:number
}

const videoSchema = new mongoose.Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  videoUrl:{type:String,required:true},
  thumbnailUrl:{type:String,required:true},
  controls:{type:Boolean,default:true},
  transformation:{
    width:VIDEO_DIMENSION.width,
    height:VIDEO_DIMENSION.height
  },
  quality:{type:Number,min:320,max:1080,default:720}
},
{timestamps:true}
)

const Video = mongoose.models?.Video || mongoose.model("Video",videoSchema);

export default Video;