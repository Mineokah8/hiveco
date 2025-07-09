import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clear user from context
    router.replace('/login'); // Send back to login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Welcome, {user?.email}</Text>

      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, marginBottom: 20 },
});
