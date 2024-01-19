export default class Post {
  constructor(id, user, postTitle, postText, createAt) {
    this.id = id;
    this.user = user;
    this.postTitle = postTitle;
    this.postText = postText;
    this.createAt = createAt;
  }
}
