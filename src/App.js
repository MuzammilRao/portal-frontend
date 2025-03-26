import { Suspense } from 'react';
import Loader from './components/Loader';
import './styles/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterApp from './config/router';

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Router>
          <RouterApp />
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
