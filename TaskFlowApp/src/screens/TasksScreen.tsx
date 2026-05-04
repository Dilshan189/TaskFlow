import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import { useTaskStore } from '../store/useTaskStore';

const TasksScreen = () => {
  const { tasks } = useTaskStore();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={[styles.priorityLine, { backgroundColor: item.priority === 'High' ? COLORS.danger : (item.priority === 'Medium' ? COLORS.warning : COLORS.success) }]} />
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDesc} numberOfLines={1}>{item.description || 'No description'}</Text>
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item.priority}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Tasks</Text>
        <Text style={styles.subtitle}>{tasks.length} tasks in total</Text>
      </View>
      
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks yet. Start by adding one!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.l,
    paddingTop: 60,
    paddingBottom: SPACING.m,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  list: {
    padding: SPACING.l,
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 1.5,
    marginBottom: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.m,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  priorityLine: {
    width: 4,
    height: '100%',
    position: 'absolute',
    left: 0,
  },
  taskInfo: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  taskDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: COLORS.chip,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});

export default TasksScreen;
