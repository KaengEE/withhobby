import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/category";

class CategoryService {
  //카테고리 리스트 불러오기
  getList() {
    return axios.get(`${API_URL}/list`, { headers: authHeader() });
  }
  //카테고리 생성
  createCategory(categoryName) {
    return axios.post(
      `${API_URL}/create`,
      { category: categoryName },
      { headers: authHeader() }
    );
  }
}

const categoryService = new CategoryService();

export default categoryService;
