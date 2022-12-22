import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewEntry from './pages/NewEntry';
import Entries from './pages/Entries';
import Entry from './pages/Entry';

function App() {
  return <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new-entry' element={<PrivateRoute />}>
            <Route path='/new-entry' element={<NewEntry />} />
          </Route>
          <Route path='/entries' element={<PrivateRoute />}>
            <Route path='/entries' element={<Entries />} />
          </Route>
          <Route path='/entry/:entryId' element={<PrivateRoute />}>
            <Route path='/entry/:entryId' element={<Entry />} />
          </Route>
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>;
}

export default App;
