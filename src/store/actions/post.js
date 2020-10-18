import {
    ADD_POST,
    LOAD_POSTS,
    REMOVE_POST,
    SEARCH_POST,
    SEARCH_POST_BY_STATUS,
    UPDATE_POSTS,
    RESOLVE_POST,
    SORT_POSTS_BY_STATUS
} from "../types";
import { DATA } from "../../data";

export const loadPosts = () => {
    return {
        type: LOAD_POSTS,
        payload: DATA
    }
}

export const removePost = id => {
    return {
        type: REMOVE_POST,
        payload: id
    }
}

export const addPost = text => {
    return {
        type: ADD_POST,
        payload: text
    }
}

export const searchPost = text => {
    return {
        type: SEARCH_POST,
        payload: text
    }
}

export const searchPostByStatus = status => {
    return {
        type: SEARCH_POST_BY_STATUS,
        payload: status
    }
}

export const updatePosts = () => {
    return {
        type: UPDATE_POSTS,
    }
}

export const resolvePost = (data) => {
    return {
        type: RESOLVE_POST,
        payload: data
    }
}

export const sortPosts = () => {
    return {
        type: SORT_POSTS_BY_STATUS,
    }
}
