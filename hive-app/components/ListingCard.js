import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ListingCard({ listing }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({
        pathname: '/(app)/marketplace/listing-detail',
        params: {
          id: listing.id,
          title: listing.title,
          price: listing.price,
          image: listing.image,
          seller: listing.seller,
        },
      })}
    >
      <View style={styles.card}>
        <Image source={{ uri: listing.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>{listing.price}</Text>
          <Text style={styles.seller}>Seller: {listing.seller}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#2c7',
    marginTop: 4,
  },
  seller: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
