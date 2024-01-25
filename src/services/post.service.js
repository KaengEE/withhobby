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
    return axios.get(`${API_URL}/list`);
  }
  // 게시글 상세조회
  getPostDetail(postId) {
    return axios.get(`${API_URL}/${postId}`, { headers: authHeader() });
  }
  // 게시글 수정
  updatePost(postId, updatedData) {
    return axios.put(`${API_URL}/update/${postId}`, updatedData, {
      headers: authHeader(),
    });
  }
  // 게시글 삭제
  deletePost(postId) {
    return axios.delete(`${API_URL}/delete/${postId}`, {
      headers: authHeader(),
    });
  }
  //유저별 게시글 조회
  getUserPost(userId) {
    return axios.get(`${API_URL}/list/${userId}`, {
      headers: authHeader(),
    });
  }
}

const postService = new PostService();

export default postService;
