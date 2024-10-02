import { BrowserRouter as Router } from 'react-router-dom';
import store from 'store';
import { Provider } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppRoutes from './hocs/routes/routes'; 
import { useEffect } from 'react';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Hablemos de Belgrano | Diario deportivo</title>
        <meta name="description" content="Portal de noticias del Club Atletico Belgrano de Córdoba"/>
        <link rel="canonical" href="https://www.hablemosdebelgrano.com.ar/" />
        <meta name='keywords' content="Belgrano, Pirata, Córdoba, Noticias, Fútbol, Córdoba"/>
        <meta name='robots' content="all"/>
        <meta name='author' content="Hablemos de Belgrano"/>
        <meta name='publisher' content="Hablemos de Belgrano"/>
      </Helmet>
      <Provider store={store}>
        <Router>
          <AppRoutes /> 
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;