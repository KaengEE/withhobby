export default class Team {
  constructor(id, teamname, teamHost, teamTitle, teamImg, category, createAt) {
    this.id = id;
    this.teamname = teamname;
    this.teamHost = teamHost;
    this.teamTitle = teamTitle;
    this.teamImg = teamImg;
    this.category = category;
    this.createAt = createAt;
  }
}
