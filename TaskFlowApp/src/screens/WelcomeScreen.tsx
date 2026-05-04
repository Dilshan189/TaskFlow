import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { COLORS, SPACING } from '../utils/theme';


const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80' }} 
            style={styles.image} 
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </View>

        <View style={styles.textContainer}>
          <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.brand}>TaskFlow</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(400).duration(1000)} style={styles.title}>Organize your life,{'\n'}achieve your goals.</Animated.Text>
          <Animated.Text entering={FadeInDown.delay(600).duration(1000)} style={styles.subtitle}>
            The smartest way to manage your daily tasks with AI-driven priority scoring.
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInUp.delay(800).duration(1000)} style={styles.footer}>
          <TouchableOpacity 
            onPress={() => navigation.replace('Main')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[COLORS.primary, '#4F46E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.footerText}>By continuing, you agree to our Terms & Privacy Policy</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: '55%',
    width: '100%',
    borderBottomLeftRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(17, 24, 39, 0.3)',
  },
  textContainer: {
    padding: SPACING.xl,
    marginTop: -40,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 60,
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 15,
    lineHeight: 24,
  },
  footer: {
    padding: SPACING.xl,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 20,
  }
});

export default WelcomeScreen;
