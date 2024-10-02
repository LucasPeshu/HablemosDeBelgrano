import { connect } from "react-redux";

export function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-6 lg:px-8">
        <div className="border-t border-gray-200 pt-4">
          <p className="text-base text-gray-400 text-center">&copy; 2024 Hablemos de Belgrano. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps,{

}) (Footer);