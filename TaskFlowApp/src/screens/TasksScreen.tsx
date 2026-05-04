import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import { useTaskStore } from '../store/useTaskStore';

const TasksScreen = () => {
  const { tasks, toggleTask, deleteTask } = useTaskStore();

  const renderItem = ({ item }: any) => (
    <View style={styles.taskCard}>
      <View style={[styles.priorityLine, { backgroundColor: item.priority === 'High' ? COLORS.danger : (item.priority === 'Medium' ? COLORS.warning : COLORS.success) }]} />
      
      <TouchableOpacity 
        style={styles.checkbox} 
        onPress={() => toggleTask(item.id)}
      >
        <Text style={styles.checkboxIcon}>{item.status === 'Completed' ? '✅' : '⭕'}</Text>
      </TouchableOpacity>

      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.status === 'Completed' && styles.completedText]}>{item.title}</Text>
        <Text style={styles.taskDesc} numberOfLines={1}>{item.description || 'No description'}</Text>
      </View>

      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={{ fontSize: 18 }}>🗑️</Text>
      </TouchableOpacity>
    </View>
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
  completedText: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
    opacity: 0.6,
  },
  taskDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  checkbox: {
    marginLeft: 10,
    marginRight: 5,
  },
  checkboxIcon: {
    fontSize: 22,
  },
  deleteButton: {
    padding: 10,
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
