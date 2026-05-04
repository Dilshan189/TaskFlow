/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import { useTaskStore } from '../store/useTaskStore';

Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { tasks } = useTaskStore();
  const categories = ['All Tasks', 'Urgent', 'Personal', 'Work', 'Ideas'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Vanessa</Text>
          <Text style={styles.subGreeting}>Welcome back to TaskFlow</Text>
        </View>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=vanessa' }} 
          style={styles.avatar} 
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            placeholder="Search tasks..." 
            style={styles.searchInput}
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Categories */}
        <Text style={styles.sectionTitle}>Select your category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryChip, index === 0 && styles.activeChip]}
            >
              <Text style={[styles.categoryText, index === 0 && styles.activeChipText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Task Card */}
        <View style={styles.featuredCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }} 
            style={styles.featuredImage} 
          />
          <View style={styles.cardOverlay}>
            <TouchableOpacity style={styles.heartIcon}>
              <Text style={{ fontSize: 18 }}>🤍</Text>
            </TouchableOpacity>
            
            <View style={styles.cardBottom}>
              <Text style={styles.cardLocation}>Urgent Task</Text>
              <Text style={styles.cardTitle}>Complete App Design</Text>
              
              <View style={styles.cardFooter}>
                <View style={styles.ratingBox}>
                  <Text style={styles.ratingText}>⭐ 5.0</Text>
                </View>
                <TouchableOpacity style={styles.seeMoreButton}>
                   <Text style={styles.seeMoreText}>View Details</Text>
                   <View style={styles.arrowIcon}>
                      <Text style={{ color: 'black', fontSize: 12 }}>➡️</Text>
                   </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Regular Tasks List */}
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        <View style={{ paddingHorizontal: SPACING.l }}>
          {tasks.length === 0 ? (
            <Text style={{ color: COLORS.textSecondary }}>No tasks found.</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                 <View style={[styles.priorityDot, { backgroundColor: task.priority === 'High' ? COLORS.danger : (task.priority === 'Medium' ? COLORS.warning : COLORS.success) }]} />
                 <Text style={styles.taskItemText}>{task.title}</Text>
                 <Text style={styles.taskItemPriority}>{task.priority}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB to Add Task */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.fabPlus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingTop: 60,
    paddingBottom: SPACING.m,
  },
  greeting: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subGreeting: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    alignItems: 'center',
    marginVertical: SPACING.m,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: SPACING.m,
    height: 55,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  filterButton: {
    backgroundColor: COLORS.black,
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  filterIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: SPACING.l,
    marginTop: SPACING.l,
    marginBottom: SPACING.m,
  },
  categoriesList: {
    paddingLeft: SPACING.l,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeChipText: {
    color: COLORS.white,
  },
  featuredCard: {
    marginHorizontal: SPACING.l,
    height: 400,
    borderRadius: SIZES.radius,
    marginTop: SPACING.l,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: SPACING.l,
    justifyContent: 'space-between',
  },
  heartIcon: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBottom: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SPACING.m,
    borderRadius: SIZES.radius,
  },
  cardLocation: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  seeMoreButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
  },
  seeMoreText: {
    color: COLORS.black,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowIcon: {
    backgroundColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: SIZES.radius / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  taskItemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  taskItemPriority: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 25,
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  fabPlus: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
