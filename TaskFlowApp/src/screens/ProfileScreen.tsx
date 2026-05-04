import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS, SPACING, SIZES } from '../utils/theme';
import { useTaskStore } from '../store/useTaskStore';

const ProfileScreen = ({ navigation }: any) => {
  const { tasks } = useTaskStore();
  
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = tasks.filter(t => t.status === 'Pending').length;

  const handleItemPress = (label: string) => {
    if (label === 'Logout') {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", style: "destructive", onPress: () => navigation.replace('Welcome') }
        ]
      );
    } else {
      Alert.alert(label, `${label} settings will be available soon!`);
    }
  };

  const menuItems = [
    { icon: '👤', label: 'Personal Information' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '🔒', label: 'Security' },
    { icon: '❓', label: 'Help & Support' },
    { icon: '🚪', label: 'Logout', color: COLORS.danger },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=vanessa' }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>Vanessa Carter</Text>
          <Text style={styles.email}>vanessa.c@taskflow.com</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{tasks.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{completed}</Text>
              <Text style={styles.statLabel}>Done</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>{pending}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => Alert.alert("Edit Profile", "Edit profile coming soon!")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={() => handleItemPress(item.label)}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <Text style={[styles.menuLabel, item.color ? { color: item.color } : {}]}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>TaskFlow v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 80,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 15,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 25,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNum: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
  },
  editButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  menuContainer: {
    padding: SPACING.l,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: SIZES.radius / 1.5,
    marginBottom: SPACING.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.chip,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  chevron: {
    fontSize: 24,
    color: COLORS.textSecondary,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 120,
    marginTop: 20,
  },
  versionText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  }
});

export default ProfileScreen;
