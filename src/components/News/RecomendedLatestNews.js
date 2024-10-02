import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_news_list_page } from 'redux/actions/news/news';

const RecomendedLatestNews = ({ news, get_news_list_page }) => {
    useEffect(() => {
        get_news_list_page(1);
    }, [get_news_list_page]);

    return (
        <div className=''>
            {news ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-100">
                    <h2 className="text-2xl font-bold pb-4">Te puede interesar:</h2>
                    <ul className="divide-y divide-gray-300">
                        {news.map((item) => (
                            <li key={item.id} className="py-2">
                                <Link to={`/noticia/${item.slug}`} className="text-black hover:text-blue-500 hover:underline">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No news available</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    news: state.news.news_list,
});

export default connect(mapStateToProps, { get_news_list_page })(RecomendedLatestNews);