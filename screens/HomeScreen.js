import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Searchbar, Text, ActivityIndicator, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import debounce from 'lodash/debounce';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('marvel');
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async (query, showLoading = true) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      if (showLoading) setLoading(true);
      setError(null);
      const results = await searchMovies(query);
      setMovies(results || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => fetchMovies(query), 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMovies(searchQuery, false);
  };

  const renderEmptyState = () => (
    <View style={styles.centered}>
      <MaterialIcons name="local-movies" size={64} color="#ccc" />
      <Text style={styles.emptyText}>
        {searchQuery.trim()
          ? 'Nenhum filme encontrado'
          : 'Digite algo para buscar filmes'}
      </Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.centered}>
      <MaterialIcons name="error-outline" size={64} color="#ff5252" />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => fetchMovies(searchQuery)}>
        <Text style={styles.retryText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Searchbar
          placeholder="Buscar filmes..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          icon="movie-search"
        />
      </Surface>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1976D2" />
          <Text style={styles.loadingText}>Buscando filmes...</Text>
        </View>
      ) : error ? (
        renderErrorState()
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('MovieDetails', { imdbID: item.imdbID })}
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#1976D2']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    elevation: 4,
    backgroundColor: '#fff',
  },
  searchBar: {
    margin: 16,
    elevation: 0,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  error: {
    color: '#ff5252',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
    marginTop: 8,
  },
  retryButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#1976D2',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
});

