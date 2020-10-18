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
import POST_STATUSES from "../../Components/PostStatuses";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const initState = {
    allPosts: [],
    searchPost: [],
    searchPostByStatus: []
}

export const postReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {...state, allPosts: action.payload}
        case REMOVE_POST:
            return {...state, allPosts: state.allPosts.filter(p => p.id !== action.payload)}
        case ADD_POST: {
            const post = {
                id: uuidv4(),
                date_creation: new  Date().toLocaleTimeString(),
                date_update: '',
                text: action.payload,
                status: POST_STATUSES.IN_PROGRESS
            }
            return {...state, allPosts: [ post,...state.allPosts ]}
        }
        case SEARCH_POST:
            return {...state, searchPost: state.allPosts.filter(p => p.text === action.payload)}
        case SEARCH_POST_BY_STATUS:
            return {...state, searchPostByStatus: state.allPosts.filter(p => p.status === action.payload)}
        case UPDATE_POSTS: {
            let nextIndex = 1;
            let currentIndex = 1;
            const updated = state.allPosts
                .map(post => {
                    if(post.status === POST_STATUSES.IN_PROGRESS){
                        if(nextIndex === currentIndex){
                            post.status = POST_STATUSES.EXPIRED;
                            nextIndex *= 2;
                        }
                        currentIndex++;
                    }
                    return post;
                })
            return {...state,allPosts: updated};
        }
        case RESOLVE_POST: {
            const{date, postId} = action.payload;
            const post = state.allPosts.find(post => post.id === postId);
            const updatedPosts = state.allPosts.filter(post => post.id !== postId);
            post.date_update = date;
            post.status = POST_STATUSES.DONE;
            return {...state,allPosts: [post,...updatedPosts]};
        }
        case SORT_POSTS_BY_STATUS: {
            const done = state.allPosts.filter(post => post.status === POST_STATUSES.DONE);
            const isProgress = state.allPosts.filter(post => post.status === POST_STATUSES.IN_PROGRESS);
            const expired = state.allPosts.filter(post => post.status === POST_STATUSES.EXPIRED);
            return {...state,allPosts: [...done,...isProgress,...expired]};
        }
        default: return state
    }
}
