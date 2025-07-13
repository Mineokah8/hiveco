import { View, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>🐝 Welcome to Hive</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
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
