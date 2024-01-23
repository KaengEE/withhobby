import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/comment";

class CommentService {
  // 댓글 작성
  createComment(postId, commentData) {
    return axios.post(`${API_URL}/${postId}/create`, commentData, {
      headers: authHeader(),
    });
  }

  // 댓글 목록
  getComments(postId) {
    return axios.get(`${API_URL}/${postId}`, { headers: authHeader() });
  }
}

const commentService = new CommentService();

export default commentService;
