import React from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";

function Logout(props) {
  const URL = "https://socialnetworklite.herokuapp.com";

  const userToken = JSON.parse(sessionStorage.getItem("token"));

  const logoutButton = {
    backgroundColor: "inherit",
    color: "white",
    border: "white 1px solid",
    //trying to add a CSS hover attribute
    "&:hover": {
      backgroundColor: "black",
      color: "black",
    },
  };

  const handleLogout = () => {
    fetch(`${URL}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.history.push("/login");

        //removes all saved data from session storage
        sessionStorage.clear();
      });
  };
  return (
    <div>
      <Button onClick={handleLogout} style={logoutButton}>
        Logout
      </Button>
    </div>
  );
}

export default withRouter(Logout);
