import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function ListingDetailScreen() {
  const { title, price, seller, image } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Listing Details',
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const handleContactSeller = () => {
    alert(`📞 Contacting ${seller}...`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>₦{price}</Text>
      <Text style={styles.seller}>Sold by: {seller}</Text>

      <Button title="Contact Seller" onPress={handleContactSeller} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});
