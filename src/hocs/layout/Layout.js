import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import { connect } from "react-redux";

function Layout({children}){
  return (
    <div>
      <Navbar />
      <div className="pt-20 sm:pt-20 lg:pt-20">
        {children}
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps,{

}) (Layout);