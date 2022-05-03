import React, {Component, useEffect, useState} from "react";
import { Card, CardColumns } from "react-bootstrap";
import { fetchPosts } from "../../../api/posts";

const Posts = () => {
 const username = sessionStorage.getItem("username");
 const [userPosts, setUserPosts] = useState([]);

      useEffect(() => {
          setUserPosts(fetchPosts(username));
  }, []);
  let allUserPosts = userPosts.map((element, index) => {
    let findCutoff = element.createdAt.indexOf("T");
    let dateCreated = element.createdAt.slice(0, findCutoff);
    return (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>{element.username}</Card.Title>
            <Card.Text>{element.text} </Card.Text>
            <Card.Text>
              <small className="text-muted">Posted on {dateCreated}</small>
            </Card.Text>
          </Card.Body>
        </Card>
    );
  });
  return(
      <div className="p-5">
        <CardColumns>{allUserPosts}</CardColumns>
      </div>
  )
}
export default Posts;