
import mongoose from "mongoose"



const NewsPostSchea = new mongoose.Schema({
    
    title:{
        type : String,
        required:true
    },


    create_by_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"ProfileData"
    },

    
    likes:[
{type:mongoose.Schema.Types.ObjectId,ref:"ProfileData"}

    ]

        
    ,

    comments:[
{


    comment_by_id:{
type:mongoose.Schema.Types.ObjectId,ref:"ProfileData"
},
comment_content:{
    type:String,
    required:true
} 


}
    ],

    

    Images:{
        type:[String],
        required:true
    },

    description:{
        type:String
    }

   



}, {timestamps:true} )

export const PostDB = mongoose.model('Post', NewsPostSchea);