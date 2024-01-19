export default class Comment {
  constructor(id, post, user, commentText, createAt) {
    this.id = id;
    this.post = post;
    this.user = user;
    this.commentText = commentText;
    this.createAt = createAt;
  }
}
