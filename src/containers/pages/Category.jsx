import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Layout from 'hocs/layout/Layout';
import { useParams } from 'react-router-dom';
import { get_news_list_category_page } from 'redux/actions/news/news';
import { ClipLoader } from 'react-spinners';
import CardCategory from 'components/Category/CardCategory';
import Error404 from 'containers/errors/Error404';

const Category = ({ get_news_list_category_page, news_list, next, previous }) => {
    const params = useParams();
    const slug = params.slug;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        get_news_list_category_page(slug, currentPage);
        window.scrollTo(0, 0);
    }, [slug, currentPage, get_news_list_category_page]);

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
        <Layout>
            <div className="bg-gray-200 px-4 sm:px-4 lg:px-52 py-8">
                {
                    news_list ? (
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl lg:text-5xl">Noticias de {slug}</h1>
                            <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                                {news_list.map(news => (
                                    <CardCategory
                                        key={news.id}
                                        thumbnail={news.thumbnail}
                                        title={news.title}
                                        description={news.description}
                                        slug={news.slug}
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
                        <div className="flex justify-center items-center h-screen">
                            <Error404 />
                        </div>
                    )
                }
                
            </div>
        </Layout>
    );
};

const mapStateToProps = state => ({
    news_list: state.news.news_list_category,
    next: state.news.next,
    previous: state.news.previous
});

export default connect(mapStateToProps, { get_news_list_category_page })(Category);