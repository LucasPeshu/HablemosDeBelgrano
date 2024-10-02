import { combineReducers } from 'redux';
import categories from './categories';
import news from './news';
import auth from './auth';
import transmission from './transmission';
export default combineReducers({
    categories,
    news,
    auth,
    transmission
})