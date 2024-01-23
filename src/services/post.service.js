import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/post";
class PostService {
  //게시글작성
  createPost(post) {
    return axios.post(`${API_URL}/create`, post, {
      headers: authHeader(),
    });
  }
}

const postService = new PostService();

export default postService;
