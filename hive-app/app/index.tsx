import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user } = useAuth();

  // If logged in, go to home
  if (user) {
    return <Redirect href="/home" />;
  }

  // Otherwise, go to login
  return <Redirect href="/login" />;
}
