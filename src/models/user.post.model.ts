import mongoose from "mongoose";




export interface IPostComment {
  commentId: number;
  content: string;
  responder_name: string;
  responder_last_name:string;
}


export const PostComment = new mongoose.Schema<IPostComment>({
  // commentId:{
  //   type : Number,
  //   required: true
  // },
  content:{
    type: String,
    reuired: true
  },

  responder_name:{
    type : String,
    required: true
  },
  responder_last_name:{
    type : String,
    required: true
  }
})

export interface IUserPost {
  content: string;
  imgurl: string
  owner: string;
  comments: [IPostComment];
}

const userPostSchema = new mongoose.Schema<IUserPost>({
  content: {
    type: String,
    required: true,
  },
  imgurl:{
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
  },
  comments: {
    type: [PostComment],
    required: false,
  },
});

export default mongoose.model<IUserPost>("UserPost", userPostSchema);