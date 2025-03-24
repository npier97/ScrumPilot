import { Button } from '@/components/ui/button';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-svh'>
        <Button>Click me</Button>
      </div>
      <Footer />
    </>
  );
}

export default App;
