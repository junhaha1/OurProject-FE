class ApiClient{
  static SERVER_URL = "http://localhost:8080";
  static BOARD_ARTICLE = "/board/article";
  static BOARD_COMMNET = "/board/comment";
  static BOARD_USER = "/board/user";
  static COMMNET_GOOD = "/comment/good";
  static BOARD_GOOD = "/board/good";

  //Get: 게시글 목록 가져오기
  static getArticleList(){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + '/list')
    .then((res) => res.json());
  }
  //Get: 게시글 상세 정보 가져오기
  static getArticleDetail(articleId){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + '/list/' + articleId)
    .then((res) => res.json());
  }

  //get: 게시글에 달린 댓글 목록 가져오기
  static getCommentList(boardId){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_COMMNET + "/list/" + boardId)
    .then((res) => res.json());
  }

  //get: 게시글 좋아요 조회
  static countBoardGood(boardId){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_GOOD + "/" + boardId)
  }

  //get: 게시글 좋아요 눌렀는지 확인
  static getExistsBoardGood(boardId, userId){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_GOOD + "/" + boardId + "/" + userId)
    .then((res) => res.json());
  }

  //post: 새 글 추가
  static sendArticle(userId, article_data){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + "/" + userId, article_data);
  }

  //글 수정
  static updateArticle(articleId, userId, ctId, title, content, codeContent, errorContent, regDate, updateDate){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + "/" + articleId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            ctId: ctId,
            title: title,
            content: content,
            codeContent: codeContent,
            errorContent: errorContent,
            regDate: regDate,
            updateDate: updateDate,
        }),
    });
  }

  //글 삭제
  static deleteArticle(articleId){
      console.log("Delete Article By articleId ");
      return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + "/" +  articleId, {
          method: "DELETE", 
          headers: {
              "Content-Type": "application/json"
          }
      });
  }

  //post: 게시글 좋아요 추가 기능
  static addLikeArticle(boardId, userId) {
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_GOOD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boardId, userId })  // 서버 DTO와 정확히 일치
    });
  }

  //delete: 게시글 좋아요 삭제 기능
  static deleteLikeArticle(boardId, userId){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_GOOD + "/" + boardId + "/" + userId, {method: 'DELETE'})
  }


  //댓글 추가
  static sendComment(articleId, userId, content, codeContent, regDate, updateDate){
    console.log("댓글 저장 API 호출 후 : " + articleId +", " + userId );
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_COMMNET + "/" + articleId +"/" + userId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            articleId: articleId,
            userId: userId,
            comment: content,
            codeComment: codeContent,
            regDate: regDate,
            updateDate: updateDate,
        }),
    });
  }

  //댓글 수정
  static updateComment(commentId, content, codeContent, updateDate){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_COMMNET + "/" + commentId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment: content,
            codeComment: codeContent,
            updateDate: updateDate
        }),
    });
  }

  //댓글 삭제
  static deleteComment(commentId){
    console.log("Delete Comment By commentId ");
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_COMMNET + "/" + commentId, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json"
        }
    });
  }

  //사용자
  static sendUser(userId, name, pwd, regDate){
    console.log("유저저 저장 API 호출 후 : " + userId );
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_USER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          name: name,
          pwd: pwd,
          regDate: regDate
        }),
    });
  }
  

  static getUser(userId){
    console.log("Get user By articleId ");
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_USER + "/" + userId);
  }
}

export default ApiClient;