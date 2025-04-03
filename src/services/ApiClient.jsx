class ApiClient{
  static SERVER_URL = "http://localhost:8080";
  static BOARD_ARTICLE = "/board/article";
  static BOARD_COMMNET = "/board/comment";
  static BOARD_USER = "/board/user";
  static COMMNET_GOOD = "/comment/good";
  static BOARD_GOOD = "/board/good";

  //Get
  static getArticleList(){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + '/list')
    .then((res) => res.json());
  }
  //Get
  static getArticleDetail(articleId){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + '/list/' + articleId)
    .then((res) => res.json());
  }

  static sendArticle(userId, article_data){
    return fetch(ApiClient.SERVER_URL + ApiClient.BOARD_ARTICLE + "/" + userId, article_data);
  }
}

export default ApiClient;