import './landingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Outlet } from 'react-router';
import axios from 'axios';

function LandingPage() {
    async function getPosts() {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }
  return (
    <div className='landingPage'>
      <Header />
      <div className="landingPageContent"><Outlet/></div>
      <Footer />
    </div>
  )
}

export default LandingPage;