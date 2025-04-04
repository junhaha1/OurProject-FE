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

  //post: 새 글 추가
  static sendArticle(userId, article_data){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + "/" + userId, article_data);
  }
  //post: 게시글 좋아요 추가 기능
  static likeArticle(good_data){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_GOOD, good_data);
  }
}

export default ApiClient;