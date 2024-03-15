import mongoose from "mongoose";




export interface PostComment{
  id: number;
  message: string;
  commentator_name: string;
}


const PostComment = new mongoose.Schema<PostComment>({
  id:{
    type : Number,
    required: true
  },
  message:{
    type: String,
    reuired: true
  },

  commentator_name:{
    type : String,
    required: true
  }
})

export interface IUserPost {
  content: string;
  imgurl: string
  owner: string;
  comments: [PostComment];
}

// export class PostComment{
//   id: number;
//   message: string;
//   commentator_name: string;

// }

const studentPostSchema = new mongoose.Schema<IUserPost>({
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

export default mongoose.model<IUserPost>("UserPost", studentPostSchema);