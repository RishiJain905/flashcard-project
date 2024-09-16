import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register/register'
import Login from './components/login/login'
import Header from './components/header/header';
import Content from './components/content/content';
import Footer from './components/footer/footer';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

function App() {

  return (
    <div className='landingPage'>
      <Header />
      <div className="landingPageContent"><Outlet/></div>
      <Footer />
    </div>
  )
}

export default App
