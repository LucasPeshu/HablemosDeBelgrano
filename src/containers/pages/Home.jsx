import { useEffect } from 'react';
import Layout from "hocs/layout/Layout";
import Header from '../../components/home/Header';
import Advertising from '../../components/home/AdvertisingBanner';
import LatestNews from "components/home/LatestNews";
import VideoPlayer from "components/home/VideoPlayer";
import NewsCategory from 'components/home/NewsCategory';

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <Layout>
      <div className='bg-gray-200'>
        <Header />
        <div className="pb-4 px-4 sm:px-4 lg:px-52">
          <LatestNews/>
        </div>
        <VideoPlayer />
        <div className="py-4 pb-4 px-4 sm:px-4 lg:px-52">
        <NewsCategory/>
        </div>
      </div>
    </Layout>
  );
}

export default Home;