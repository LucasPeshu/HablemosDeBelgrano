import axios from 'axios';
import {
    GET_NEWS_LIST_SUCCESS,
    GET_NEWS_LIST_FAIL,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAIL,
    GET_AUTH_NEWS_SUCCESS,
    GET_AUTH_NEWS_FAIL,
    GET_NEWS_LIST_CATEGORIES_SUCCESS,
    GET_NEWS_LIST_CATEGORIES_FAIL,
    GET_SEARCH_NEWS_SUCCESS,
    GET_SEARCH_NEWS_FAIL,
    GET_AUTHOR_NEWS_LIST_SUCCESS,
    GET_AUTHOR_NEWS_LIST_FAIL,
    CATEGORIES_WITH_NEWS_REQUEST,
    CATEGORIES_WITH_NEWS_SUCCESS,
    CATEGORIES_WITH_NEWS_FAIL
} from "./types"


export const get_author_news_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/author_list`, config)

        if(res.status === 200){
            dispatch({
                type: GET_AUTHOR_NEWS_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_AUTHOR_NEWS_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_AUTHOR_NEWS_LIST_FAIL
        });
    }
}

export const get_author_news_list_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/author_list?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_AUTHOR_NEWS_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_AUTHOR_NEWS_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_AUTHOR_NEWS_LIST_FAIL
        });
    }
}

export const get_news_list = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/list`, config)

        if(res.status === 200){
            dispatch({
                type: GET_NEWS_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_NEWS_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_NEWS_LIST_FAIL
        });
    }
}

export const get_news_list_page = (page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/list?p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_NEWS_LIST_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_NEWS_LIST_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_NEWS_LIST_FAIL
        });
    }
}

export const get_news_list_category = (slug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/by_category?slug=${slug}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_NEWS_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_NEWS_LIST_CATEGORIES_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_NEWS_LIST_CATEGORIES_FAIL
        });
    }
}

export const get_news_list_category_page = (slug, page) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try{

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/by_category?slug=${slug}&p=${page}`, config)

        if(res.status === 200){
            dispatch({
                type: GET_NEWS_LIST_CATEGORIES_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_NEWS_LIST_CATEGORIES_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_NEWS_LIST_CATEGORIES_FAIL
        });
    }
}

export const get_news = (slug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/detail/${slug}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_NEWS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_NEWS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_NEWS_FAIL
        });
    }
}

export const get_auth_news = (slug) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/auth_detail/${slug}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_AUTH_NEWS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_AUTH_NEWS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_AUTH_NEWS_FAIL
        });
    }
}

export const search_news = (search_term) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/search?s=${search_term}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_NEWS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_NEWS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_NEWS_FAIL
        });
    }
};

export const search_news_page = (search_term,page) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/search?p=${page}&s=${search_term}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_SEARCH_NEWS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_SEARCH_NEWS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SEARCH_NEWS_FAIL
        });
    }
};

export const getCategoriesWithNews = () => async dispatch => {
    try {
        dispatch({ type: CATEGORIES_WITH_NEWS_REQUEST });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/news/categories-with-news/`);

        dispatch({
            type: CATEGORIES_WITH_NEWS_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: CATEGORIES_WITH_NEWS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};