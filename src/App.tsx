import { Button } from '@/components/ui/button';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-svh'>
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
