import { View, Text, Button, StyleSheet, SafeAreaView, Platform } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>👤 Welcome, {user?.email}</Text>

        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, marginBottom: 20 },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
});
