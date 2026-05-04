import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../utils/theme';
import { useTaskStore } from '../store/useTaskStore';

const AnalyticsScreen = () => {
  const { tasks } = useTaskStore();
  
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Mocking weekly data based on real count for visual consistency
  const weeklyData = [totalTasks + 2, totalTasks + 5, totalTasks + 1, totalTasks + 8, totalTasks + 4, totalTasks + 6, totalTasks];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Based on your {totalTasks} tasks</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#ECFDF5' }]}>
            <Text>✅</Text>
          </View>
          <Text style={styles.statValue}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#FFF7ED' }]}>
            <Text>⏳</Text>
          </View>
          <Text style={[styles.statValue, { color: COLORS.warning }]}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>In Progress</Text>
        </View>
      </View>

      <View style={styles.mainChartCard}>
        <Text style={styles.chartTitle}>Productivity Score</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{completionRate}%</Text>
          <Text style={styles.scoreSubtext}>
            {completionRate > 50 ? '🔥 You are doing great!' : '💪 Keep pushing forward!'}
          </Text>
        </View>
        
        <View style={styles.barsContainer}>
          {weeklyData.map((val, i) => (
            <View key={i} style={styles.barWrapper}>
              <View style={[styles.bar, { height: Math.max(val * 5, 20), backgroundColor: i === 6 ? COLORS.secondary : 'rgba(255,255,255,0.3)' }]} />
              <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>Smart Insights</Text>
        <TouchableOpacity style={styles.insightCard}>
          <View style={styles.insightIcon}>
             <Text>💡</Text>
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Peak Focus Hours</Text>
            <Text style={styles.insightText}>You complete 60% of tasks between 9 AM and 11 AM.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.insightCard}>
          <View style={[styles.insightIcon, { backgroundColor: '#F0F9FF' }]}>
             <Text>🎯</Text>
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Consistency Streak</Text>
            <Text style={styles.insightText}>You've hit your daily goal 5 days in a row! Keep it up.</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ height: 120 }} />
    </ScrollView>
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
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    justifyContent: 'space-between',
    marginTop: SPACING.m,
  },
  statCard: {
    backgroundColor: COLORS.white,
    width: '47%',
    padding: 20,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  mainChartCard: {
    margin: SPACING.l,
    backgroundColor: COLORS.primary,
    padding: 24,
    borderRadius: 32,
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  chartTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  scoreText: {
    color: COLORS.white,
    fontSize: 42,
    fontWeight: '800',
  },
  scoreSubtext: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barWrapper: {
    alignItems: 'center',
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  barLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '600',
  },
  insightsSection: {
    paddingHorizontal: SPACING.l,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  insightText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
});

export default AnalyticsScreen;
