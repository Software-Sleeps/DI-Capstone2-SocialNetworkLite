const URL = "https://socialnetworklite.herokuapp.com";

export const fetchPosts = (username) => {
    let posts = []
    let userToken = JSON.parse(sessionStorage.getItem("token"));

    fetch(`${URL}/posts?username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${userToken}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            posts = data.posts
        });
    return posts;
}