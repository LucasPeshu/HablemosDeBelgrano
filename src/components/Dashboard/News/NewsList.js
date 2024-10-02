import SmallSetPagination from "../Pagination/SmallSetPagination"
import NewsCard from "./NewsCard"

function NewsList({posts,get_news_list_page,count}){

    return(
    <div className="p-8">
      <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  pb-4">
        {posts&&posts.map((post,index) => (
          <NewsCard data={post} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPagination list_page={get_news_list_page} list={posts} count={count} />
    </div>
    )
}
export default NewsList