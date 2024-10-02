import { connect } from "react-redux";
import LayoutDashboard from "hocs/layout/LayoutDashboard";
import { get_author_news_list, get_author_news_list_page } from "redux/actions/news/news"
import { get_categories } from "redux/actions/categories/categories"
import { useEffect } from "react";
import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from '@heroicons/react/20/solid'
import NewsList from "components/Dashboard/News/NewsList";
import axios from "axios";
import { Link } from "react-router-dom";


function NewsDashboard({
  get_author_news_list,
  get_author_news_list_page,
  posts,
  isAuthenticated,
  count,
  next,
  previous,
  get_categories,
  categories
}){

  useEffect(()=>{
      get_author_news_list()
      get_categories()
  },[])

  return (
    <LayoutDashboard>
      {isAuthenticated ? 
      <>
      <div className="">
      <div className="p-4">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                <h3 className="text-2xl font-semibold text-gray-800">Noticias</h3>
                <p className="text-gray-600">
                    Crea o edita una noticia.
                </p>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                <button
                    onClick={()=>{
                      const config = {
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                              'Authorization': `JWT ${localStorage.getItem('access')}`
                          }
                      };

                      const body = JSON.stringify({
                        
                      })

                      const fetchData = async()=>{
                          try{
                              const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/news/create`,body,config)
                          
                              if(res.status === 200){
                                  get_author_news_list()
                              }
                          }catch(err){
                              alert('Error al crear post')
                          }
                      }
                      fetchData()
                  }}
                    className="relative inline-flex items-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-600 ">
                    Crear noticia
                </button>
                </div>
            </div>
            </div>
        <NewsList posts={posts&&posts} get_news_list_page={get_author_news_list_page} count={count&&count}/>
      </div>
      </>
      :
      <div className="h-screen p-4">
      Debes iniciar sesión para ver esta página
      </div>}
      
    </LayoutDashboard>
  );
}

const mapStateToProps = state => ({
  posts: state.news.author_news_list,
  categories: state.categories.categories,
  isAuthenticated: state.auth.isAuthenticated,
  count: state.news.count,
  next: state.news.next,
  previous: state.news.previous,
})

export default connect(mapStateToProps, {
  get_author_news_list,
  get_author_news_list_page,
  get_categories
}) (NewsDashboard);