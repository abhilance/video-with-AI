import mongoose,{Schema, model, models} from "mongoose";

export  const VIDEO_DIMENSION= {
    width : 1080,
    height: 1920
} as const;

export interface IVideo{
    _id?: mongoose.Types.ObjectId
    tittle: string
    description: string
    videoUrl:string
    thumbnailUrl: string
    controls?:boolean;
    transformation?:{
        height: number
        widht: number
        quality?: number
    }
} 

const videoSchema = new Schema<IVideo>(
    {
        tittle:{type: String, required : true },
        description:{ type : String , required : true },
        videoUrl:{ type : String, required: true},
        thumbnailUrl:{type: String, required: true},
        controls:{ type:Boolean,default:true},
        transformation:{
            height:{ type: Number, default :VIDEO_DIMENSION.height},
            widht:{ type: Number,default : VIDEO_DIMENSION.width},
            quality:{type: Number,min:1 , max:100}
        },
    },
    {
        timestamps: true
    }
)
const Video = models?.Video||model<IVideo>("Video",videoSchema);
export default Video;

