class ApiClient{
  static SERVER_URL = "http://localhost:8080";
  static BOARD_ARTICLE = "/board/article";
  static BOARD_COMMNET = "/board/comment";
  static BOARD_USER = "/board/user";
  static COMMNET_GOOD = "/comment/good";
  static BOARD_GOOD = "/board/good";

  //사용자
  static GET_USER = "/board/user/";

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

  //삭제
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

  //사용자
  static getUser(userId){
    console.log("Get user By articleId ");
    return fetch(ApiClient.SERVER_URL + ApiClient.GET_USER + userId);
  }
}

export default ApiClient;