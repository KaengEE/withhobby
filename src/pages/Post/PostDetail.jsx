import React from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  return <div>PostDetail for postId: {postId}</div>;
};

export default PostDetail;
