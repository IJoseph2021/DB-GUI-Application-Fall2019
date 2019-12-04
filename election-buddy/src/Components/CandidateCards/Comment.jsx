export default class Comment {
    constructor(questionId, userName, comment, response) {
        this.questionId = questionId;
        this.userName = userName;
        this.comment = comment;
        this.response = response;
    }
}
