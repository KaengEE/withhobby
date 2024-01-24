import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/together";

class TogetherService {
  //모임 생성
  createTogether(teamId, togetherData) {
    return axios.post(`${API_URL}/${teamId}`, togetherData, {
      headers: authHeader(),
    });
  }
  //모임 수정
  updateTogether(togetherId, updateData) {
    return axios.put(`${API_URL}/${togetherId}`, updateData, {
      headers: authHeader(),
    });
  }

  //모임 삭제
  removeTogether(togetherId) {
    return axios.delete(`${API_URL}/${togetherId}`, {
      headers: authHeader(),
    });
  }

  //모임멤버인지아닌지 확인
  checkMember(userId, togetherId) {
    return axios.get(`${API_URL}/checkMember/${userId}/${togetherId}`, {
      headers: authHeader(),
    });
  }

  //모임 리스트
  getTogetherList(teamId) {
    return axios.get(`${API_URL}/list/${teamId}`, {
      headers: authHeader(),
    });
  }

  //모임 상세조회
  getTogetherDetail(togetherId) {
    return axios.get(`${API_URL}/detail/${togetherId}`, {
      headers: authHeader(),
    });
  }
}

const togetherService = new TogetherService();

export default togetherService;
