import Footer from './components/Footer';
import Hero from './components/Home/Hero';
import Features from './components/Home/Features';
import SubNav from './components/Home/SubNav';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <SubNav />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}

export default App;
