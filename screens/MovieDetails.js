import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, Surface, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { getMovieDetails } from '../services/api';

export default function MovieDetails({ route, navigation }) {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const details = await getMovieDetails(imdbID);
      setMovie(details);
      navigation.setOptions({ title: details.Title });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <MaterialIcons name="error-outline" size={64} color="#ff5252" />
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!movie) return null;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://via.placeholder.com/300x450?text=No+Poster'
        }}
        style={styles.poster}
        resizeMode="cover"
      />

      <Surface style={styles.infoContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={24} color="#FFC107" />
          <Text style={styles.rating}>{movie.imdbRating}</Text>
        </View>

        <View style={styles.chips}>
          <Chip style={styles.chip}>{movie.Year}</Chip>
          <Chip style={styles.chip}>{movie.Runtime}</Chip>
          <Chip style={styles.chip}>{movie.Rated}</Chip>
        </View>

        <InfoSection label="Gênero" value={movie.Genre} />
        <InfoSection label="Diretor" value={movie.Director} />
        <InfoSection label="Elenco" value={movie.Actors} />
        <InfoSection label="Sinopse" value={movie.Plot} />
      </Surface>
    </ScrollView>
  );
}

const InfoSection = ({ label, value }) => (
  <View style={styles.infoSection}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 450,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 20,
    marginLeft: 8,
    color: '#666',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  infoSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  awards: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  awardsText: {
    flex: 1,
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  error: {
    color: '#ff5252',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
    marginTop: 8,
  },
});
