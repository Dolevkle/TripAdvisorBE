import mongoose from "mongoose";




export interface IPostComment {
  content: string;
  responder_id?: string;
  userImgUrl: string;
  username: string;
}


const PostComment = new mongoose.Schema<IPostComment>({
  content:{
    type: String,
    reuired: true
  },

  responder_id:{
    type : String,
    required: true
  },
  userImgUrl:{
    type : String,
    required: true
  },
  username:{
    type : String,
    required: true
  }
})

export interface IUserPost {
  content: string;
  imgUrl: string
  owner?: string;
  username:string;
  userImgUrl: string
  comments?: [IPostComment];
}

const userPostSchema = new mongoose.Schema<IUserPost>({
  content: {
    type: String,
    required: true,
  },
  imgUrl:{
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
  userImgUrl:{
    type: String,
    required: true,
  },
  username:{
    type : String,
    required: true,
  }
});

export default mongoose.model<IUserPost>("UserPost", userPostSchema);