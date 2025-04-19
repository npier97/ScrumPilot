import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from '@tanstack/react-router';
import { DoorOpenIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const Dashboard = () => {
  const { signOutUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  // TODO: implem dashboard UI
  return (
    <>
      <h1>Welcome on your dashboard</h1>
      <Button onClick={() => signOutUser()} variant='link'>
        {' '}
        signOut
        <DoorOpenIcon size={22} />
      </Button>
      <Link to='/'>
        <Button variant='link'> Home</Button>
      </Link>
    </>
  );
};

export default Dashboard;
