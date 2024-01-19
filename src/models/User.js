export default class User {
  constructor(
    id,
    username,
    name,
    password,
    userProfile,
    role,
    token,
    userStatus,
    createTime
  ) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.password = password;
    this.userProfile = userProfile;
    this.role = role;
    this.token = token;
    this.userStatus = userStatus;
    this.createTime = createTime;
  }
}
