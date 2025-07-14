import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import PrevPageIcon from '@/assets/icons/PrevPageIcon';

export default function ListingDetailScreen() {
  const { title, price, seller, image } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: 'Listing Details',
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  const handleContactSeller = () => {
    alert(`📞 Contacting ${seller}...`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navContainer}>
        <View style={styles.navigationBack}>
          <TouchableOpacity onPress={() => router.navigate('/(app)/(tabs)/marketplace')}>
            <PrevPageIcon />
          </TouchableOpacity>
          <Text style={styles.navigationBackText}>Listing Details</Text>
          <Text></Text>
        </View>
      </View>

      {/* Adjust ScrollView later to scale to your desired peference  */}
      <ScrollView contentContainerStyle={styles.container}>  
        {image && (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₦{price}</Text>
        <Text style={styles.seller}>Sold by: {seller}</Text>

        <Button title="Contact Seller" onPress={handleContactSeller} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  container: {
    padding: 20,
    gap: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    color: 'green',
  },
  seller: {
    fontSize: 16,
    color: '#555',
  },
  navContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  navigationBack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    width: "94%",
  },
  navigationBackText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
