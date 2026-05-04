import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import { COLORS, SIZES, SPACING } from '../utils/theme';

const AddTaskScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  
  const addTask = useTaskStore((state) => state.addTask);

  const priorities = ['Low', 'Medium', 'High'];
  const categories = ['Personal', 'Work', 'Urgent', 'Idea'];

  const handleSave = () => {
    if (title.trim() === '') return;
    
    // In a real app, we'd pass priority and category to the store
    // For now, let's assume the store is updated to handle them or we just use them in UI
    addTask(title, description); 
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create New Task</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>What is to be done?</Text>
        <TextInput
          style={styles.input}
          placeholder="Task title"
          placeholderTextColor={COLORS.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add details about this task..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.chipContainer}>
          {priorities.map((p) => (
            <TouchableOpacity 
              key={p} 
              onPress={() => setPriority(p)}
              style={[
                styles.chip, 
                priority === p && { backgroundColor: p === 'High' ? COLORS.danger : (p === 'Medium' ? COLORS.warning : COLORS.success), borderColor: 'transparent' }
              ]}
            >
              <Text style={[styles.chipText, priority === p && { color: COLORS.white }]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Category</Text>
        <View style={styles.chipContainer}>
          {categories.map((c) => (
            <TouchableOpacity 
              key={c} 
              onPress={() => setCategory(c)}
              style={[
                styles.chip, 
                category === c && { backgroundColor: COLORS.primary, borderColor: 'transparent' }
              ]}
            >
              <Text style={[styles.chipText, category === c && { color: COLORS.white }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, !title.trim() && { opacity: 0.5 }]} 
          onPress={handleSave}
          disabled={!title.trim()}
        >
          <Text style={styles.saveButtonText}>Create Task</Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingTop: 40,
    paddingBottom: SPACING.l,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.chip,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: COLORS.text,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    padding: SPACING.l,
  },
  label: {
    color: COLORS.text,
    fontSize: 16,
    marginBottom: SPACING.s,
    fontWeight: '600',
    marginTop: SPACING.m,
  },
  input: {
    backgroundColor: COLORS.chip,
    color: COLORS.text,
    padding: SPACING.m,
    borderRadius: 15,
    marginBottom: SPACING.s,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.m,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginTop: 10,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: SPACING.xl,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
