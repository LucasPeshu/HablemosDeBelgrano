import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesWithNews } from 'redux/actions/news/news';
import CardLatestNews from './CardLatestNews';

const NewsCategory = () => {
    const dispatch = useDispatch();

    const categoriesWithNewsState = useSelector(state => state.news.categories_with_news);
    const { loading, data: categoriesWithNews, error } = categoriesWithNewsState;

    useEffect(() => {
        dispatch(getCategoriesWithNews());
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                categoriesWithNews.map(category => (
                    <div key={category.slug}>
                        <h2 className='text-4xl font-bold py-6'>{category.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.news.map(news => (
                                <CardLatestNews key={news.id} news={news} 
                                thumbnail={news.thumbnail}
                                title={news.title}
                                description={news.description}
                                slug={news.slug}/>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NewsCategory;