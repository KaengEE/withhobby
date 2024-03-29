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

  //댓글 수정
  updateComment(commentId, updateData) {
    return axios.put(`${API_URL}/update/${commentId}`, updateData, {
      headers: authHeader(),
    });
  }

  //댓글 삭제
  removeComment(commentId) {
    return axios.delete(`${API_URL}/delete/${commentId}`, {
      headers: authHeader(),
    });
  }

  //댓글찾기
  getComment(commentId) {
    return axios.get(`${API_URL}/find/${commentId}`, {
      headers: authHeader(),
    });
  }
}

const commentService = new CommentService();

export default commentService;
