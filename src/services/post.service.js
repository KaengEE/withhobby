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
  //게시글 목록
  getPostList() {
    return axios.get(`${API_URL}/list`, {
      headers: authHeader(),
    });
  }
  // 게시글 상세조회
  getPostDetail(postId) {
    return axios.get(`${API_URL}/${postId}`, { headers: authHeader() });
  }
}

const postService = new PostService();

export default postService;
