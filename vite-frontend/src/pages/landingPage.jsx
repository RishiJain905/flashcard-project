import './landingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Outlet } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    
  return (
    <div className='landingPage'>
      <Header />
      <div className="landingPageContent"><Outlet/></div>
      <Footer />
    </div>
  )
}

export default LandingPage;