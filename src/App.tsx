import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Emergency from './pages/Emergency';
import SubmitAvailability from './pages/SubmitAvailability';
import AdminDashboard from './pages/AdminDashboard';
import './styles/tailwind.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/emergency" component={Emergency} />
            <Route path="/submit-availability" component={SubmitAvailability} />
            <Route path="/admin" component={AdminDashboard} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;