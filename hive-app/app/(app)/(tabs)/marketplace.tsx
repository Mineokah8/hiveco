import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

const listings = [
  {
    id: '1',
    title: 'iPhone 12',
    price: '250000',
    seller: 'John Doe',
    image: 'https://via.placeholder.com/300x200.png?text=iPhone+12',
  },
  {
    id: '2',
    title: 'MacBook Pro',
    price: '750000',
    seller: 'Jane Smith',
    image: 'https://via.placeholder.com/300x200.png?text=MacBook+Pro',
  },
];

export default function MarketplaceScreen() {
  const router = useRouter();

  const handlePress = (item) => {
    router.push({
      pathname: '/(app)/marketplace/listing-detail',
      params: {
        id: item.id,
        title: item.title,
        price: item.price,
        seller: item.seller,
        image: item.image,
      },
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₦{item.price}</Text>
        <Text style={styles.seller}>By {item.seller}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Marketplace</Text>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 4,
  },
  seller: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
