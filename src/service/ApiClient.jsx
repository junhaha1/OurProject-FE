class ApiClient{
    static SEVER_URL = "http://localhost:8080";


    //게시글
    static POST_ARTICLE = "/board/article/";
    static GET_ARTICLES = "/board/article/list";
    static GET_ARTICLE = "/board/article/list/";
    static PUT_ARTICLE = "/board/article/";
    static DELETE_ARTICLE = "/board/article/";

    //댓글
    static POST_COMMENT = "/board/comment/";
    static GET_COMMENT = "/board/comment/list/";
    static PUT_COMMENT = "/board/comment";
    static DELETE_COMMENT = "/board/comment";

    //사용자
    static GET_USER = "/board/user";


    //게시글 (등록, 조회, 상세조회, 삭제)
    static sendArticle(userId, ctId, title, content, codeContent, errorContent, regDate, updateDate){
        return fetch(ApiClient.SEVER_URL + ApiClient.POST_ARTICLE + userId, {
            method: "POST",
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

    static getArticles(){
        console.log("Get Articles ");
        return fetch(ApiClient.SEVER_URL + ApiClient.GET_ARTICLES);
    }

    static getArticle(articleId){
        console.log("Get Article By articleId ");
        return fetch(ApiClient.SEVER_URL + ApiClient.GET_ARTICLE + articleId);
    }
      
    //수정
    static updateArticle(userId, ctId, title, content, codeContent, errorContent, regDate, updateDate){
        return fetch(ApiClient.SEVER_URL + ApiClient.POST_ARTICLE + articleId, {
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
        return fetch(ApiClient.SEVER_URL + ApiClient.DELETE_ARTICLE + articleId);
    }
    


    //댓글
    static sendComment(articleId, userId, content, codeContent, regDate, updateDate){
        return fetch(ApiClient.SEVER_URL + ApiClient.POST_COMMENT + articleId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                articleId: articleId,
                userId: userId,
                content: content,
                codeContent: codeContent,
                regDate: regDate,
                updateDate: updateDate,
            }),
        });
    }

    static getComment(articleId){
        console.log("Get Comment By articleId ");
        return fetch(ApiClient.SEVER_URL + ApiClient.GET_COMMENT + articleId);
    }

    static updateComment(articleId, userId, content, codeContent, regDate, updateDate){
        return fetch(ApiClient.SEVER_URL + ApiClient.PUT_COMMENT + commentId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                articleId: articleId,
                userId: userId,
                content: content,
                codeContent: codeContent,
                regDate: regDate,
                updateDate: updateDate,
            }),
        });
    }
    static deleteComment(commentId){
        console.log("Delete Comment By commentId ");
        return fetch(ApiClient.SEVER_URL + ApiClient.DELETE_COMMENT + commentId);
    }


     //사용자
    static getUser(userId){
        console.log("Get Comment By articleId ");
        return fetch(ApiClient.SEVER_URL + ApiClient.GET_USER + userId);
    }
  }
  export default ApiClient;