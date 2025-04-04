/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ApiClient from '../../service/ApiClient';

const CommentView = (props) => {

    let boardId = props.boardId;
    let userId = props.userId;
    
    const [comments, setComments] = useState([]);

    useEffect(() =>{
        console.log(boardId, userId);
        ApiClient.getComment(boardId)
        .then(res => res.json())
      .then(data => {
        setComments(data)
        console.log(data);
      });
    }, []);


    return (
        <div>
            <h2>Comment</h2>
            <table>
                <tbody>
                {comments.map((a) => (
                    <tr key={a.commentId}>
                    <td>{a.userId}</td>
                    <td>{a.comment}</td>
                    <td>{a.regDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommentView;