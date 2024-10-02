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
} from '../actions/news/types';

const initialState = {
  news_list: null,
  author_news_list: null,
  news_list_category: null,
  filtered_posts: null,
  post: null,
  count: null,
  next: null,
  previous: null,
  categories_with_news: {
    loading: false,
    data: [],
    error: null
  }
  
};

export default function news(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
      case GET_NEWS_LIST_CATEGORIES_SUCCESS:
          return {
              ...state,
              news_list_category: payload.results.posts,
              count: payload.count,
              next: payload.next,
              previous: payload.previous,
          }
      case GET_NEWS_LIST_CATEGORIES_FAIL:
          return {
              ...state,
              news_list_category: null,
              count: null,
              next: null,
              previous: null,
          }
      case GET_NEWS_LIST_SUCCESS:
          return {
              ...state,
              news_list: payload.results.posts,
              count: payload.count,
              next: payload.next,
              previous: payload.previous,
          }
      case GET_NEWS_LIST_FAIL:
          return {
              ...state,
              news_list: null,
              count: null,
              next: null,
              previous: null,
          }
        case GET_AUTHOR_NEWS_LIST_SUCCESS:
            return {
                ...state,
                author_news_list: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_AUTHOR_NEWS_LIST_FAIL:
            return {
                ...state,
                author_news_list: null,
                count: null,
                next: null,
                previous: null,
            }
      case GET_NEWS_SUCCESS:
          return {
              ...state,
              post: payload
          }
      case GET_NEWS_FAIL:
          return {
              ...state,
              post: null
          }
        case GET_AUTH_NEWS_SUCCESS:
            return {
                ...state,
                post: payload
            }
        case GET_AUTH_NEWS_FAIL:
            return {
                ...state,
                post: null
            }
      case GET_SEARCH_NEWS_SUCCESS:
          return {
              ...state,
              filtered_posts: payload.results.filtered_posts,
              count: payload.count,
              next: payload.next,
              previous: payload.previous,
          }
      case GET_SEARCH_NEWS_FAIL:
          return {
              ...state,
              filtered_posts: null,
              count: null,
              next: null,
              previous: null,
          }
          case CATEGORIES_WITH_NEWS_REQUEST:
            return {
              ...state,
              categories_with_news: {
                ...state.categories_with_news,
                loading: true,
                error: null
              }
            };
          case CATEGORIES_WITH_NEWS_SUCCESS:
            return {
              ...state,
              categories_with_news: {
                ...state.categories_with_news,
                loading: false,
                data: payload
              }
            };
          case CATEGORIES_WITH_NEWS_FAIL:
            return {
              ...state,
              categories_with_news: {
                ...state.categories_with_news,
                loading: false,
                error: payload
              }
            };
      default:
          return state
  }
}