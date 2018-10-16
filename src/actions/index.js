import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = "https://blog-server-rick-boles.herokuapp.com/api";

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts`);

    return ({
        type: FETCH_POSTS,
        payload: request
    })
}