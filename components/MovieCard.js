import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function MovieCard({ movie, onPress }) {
  return (
    <Surface style={styles.surface}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          source={{
            uri: movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/300x450?text=No+Poster'
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {movie.Title}
          </Text>
          <View style={styles.details}>
            <MaterialIcons name="movie" size={16} color="#666" />
            <Text style={styles.movieYear}>{movie.Year}</Text>
          </View>
          <View style={styles.viewMore}>
            <Text style={styles.viewMoreText}>Ver detalhes</Text>
            <MaterialIcons name="chevron-right" size={20} color="#1976D2" />
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewMoreText: {
    color: '#1976D2',
    fontSize: 14,
    marginRight: 4,
  },
});
