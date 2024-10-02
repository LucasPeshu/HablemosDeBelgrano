import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_news_list_page } from 'redux/actions/news/news'; 
import CardLatestNews from './CardLatestNews'; 

const LatestNews = ({ news, count, next, previous, get_news_list_page }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        get_news_list_page(currentPage);
    }, [get_news_list_page, currentPage]);

    const handleNextPage = () => {
        if (next) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (previous) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='pt-8'>
            <h2 className="text-3xl sm:text-5xl font-bold pb-8">Últimas noticias</h2>
            {news ? (
                <div>
                    <div className="grid grid-cols-1 gap-4 place-content-between sm:grid-cols-2 lg:grid-cols-3">
                        {news.map((item) => (
                            <CardLatestNews
                                key={item.id}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                description={item.description}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center py-4 gap-2">
                        
                        <button
                            className={`bg-gray-300 hover:bg-sky-400 text-gray-800 font-bold py-2 px-4 mx-2 rounded ${!previous ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handlePreviousPage}
                            disabled={!previous}
                        >
                            Anterior
                        </button>
                        <button
                            className={`bg-gray-300 hover:bg-sky-400 text-gray-800 font-bold py-2 px-4 rounded ${!next ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleNextPage}
                            disabled={!next}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            ) : (
                <p>No news available</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    news: state.news.news_list,
    count: state.news.count,
    next: state.news.next,
    previous: state.news.previous,
});

export default connect(mapStateToProps, { get_news_list_page })(LatestNews);
