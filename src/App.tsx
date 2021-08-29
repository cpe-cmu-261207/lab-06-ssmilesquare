import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AboutMe from './components/AboutMe';
import Current from './components/Current';
import Result from './components/Result';
import Select from './components/Select';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact><Current /></Route>
        <Route path='/current'><Current /></Route>
        <Route path='/history/select'><Select /></Route>
        <Route path='/history/result'><Result /></Route>
        <Route path='/about'><AboutMe /></Route>
      </Switch>
    </Router>
  );
}

export default App;
