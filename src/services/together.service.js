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

  //모임 삭제

  //모임 리스트
}

const togetherService = new TogetherService();

export default togetherService;
