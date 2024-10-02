import { connect } from "react-redux";
import Layout from "hocs/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { get_news } from "redux/actions/news/news";
import RecomendedLatestNews from "components/News/RecomendedLatestNews";
import SharedNews from "components/News/SharedNews";
import DOMPurify from 'dompurify';
import { ClipLoader } from 'react-spinners';

function NewsDetail({ 
  get_news,
  post }) {

  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    get_news(slug);
    window.scrollTo(0, 0);
  }, [slug, get_news]);

  return (
    <Layout>
      {
        post && post.news && post.news.slug === slug ?
        <div className="bg-gray-200 px-4 sm:px-4 lg:px-52">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8 py-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">{post.news.title}</h1>
              <img
                className="w-full pt-8"
                src={'https://res.cloudinary.com/diadzh30o/' + post.news.thumbnail}
                alt=""
              />
              <div className="min-w-0 flex-1 p-4 pt-8">
                <span className="hover:text-sky-500 mx-1 font-medium text-gray-800 text-sm">
                  <Link to={`/${post.news.category.slug}`}>{post.news.category.name}</Link>
                </span> 
                <span className="text-gray-300">&middot;</span> 
                <span className="mt-2 mx-2 font-medium text-gray-800 text-sm">{post.news.time_read} min de lectura</span> 
                <p className="mt-4 text-lg font-regular text-gray-800 leading-8">{post.news.description}</p>
                <div
                  className="mt-4 text-lg font-regular text-gray-800 leading-8"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.news.content) }}
                />
                <SharedNews url={window.location.href} title={post.news.title} />
              </div>
            </div>
            <div>
              <RecomendedLatestNews />
              
            </div>
          </div>
        </div>
        :
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#80BFFF"} loading={true} />
        </div>
      }
    </Layout>
  )
}

const mapStateToProps = state => ({
  post: state.news.post
});

export default connect(mapStateToProps, { get_news })(NewsDetail);