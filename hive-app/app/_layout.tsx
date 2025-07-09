import { Slot } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

function InnerLayout() {
  const { user } = useAuth();

  return <Slot key={user ? 'app' : 'auth'} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InnerLayout />
    </AuthProvider>
  );
}



