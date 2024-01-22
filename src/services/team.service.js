import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/team";

class TeamService {
  // 카테고리에 해당하는 팀 리스트 불러오기
  getListByCategory(categoryId) {
    return axios.get(`${API_URL}/${categoryId}`, {
      headers: authHeader(),
    });
  }
}

const teamService = new TeamService();

export default teamService;
