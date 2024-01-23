import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/member";

class MemberService {
  // 팀에 가입하기
  joinTeam(teamId) {
    return axios.post(`${API_URL}/join?teamId=${teamId}`, null, {
      headers: authHeader(),
    });
  }
  //팀의 멤버 조회
  getMember(teamId) {
    return axios.get(`${API_URL}/${teamId}`, {
      headers: authHeader(),
    });
  }
// 팀 탈퇴하기
removeMember(teamId, username) {
  return axios.delete(`${API_URL}/delete`, {
    params: {
      teamId: teamId,
      username: username,
    },
    headers: authHeader(),
  });
}
}

const memberService = new MemberService();

export default memberService;
