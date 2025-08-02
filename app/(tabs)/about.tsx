import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  const username = 'ByJ0su3'; // Cambia por tu usuario
  const repoUrl = 'https://github.com/ByJ0su3'; // Cambia por tu URL de GitHub

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          alignItems: 'center',
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        }}
      >
        {/* Título */}
        <Text style={styles.title}>App Mobile (Test Project)</Text>
        {/* Username */}
        <Text style={styles.username}>@{username}</Text>

        {/* Imagen circular */}
        <Image
          source={require('@/assets/images/img.png')} // Cambia por tu foto
          style={styles.profileImage}
        />

        {/* Link al repositorio */}
        <Pressable style={styles.linkContainer} onPress={() => Linking.openURL(repoUrl)}>
          <FontAwesome name="github" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.linkText}>My Repository</Text>
        </Pressable>

        {/* Texto final */}
        <Text style={styles.footerText}>
          Find me on GitHub for more projects and updates!
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // Fondo más elegante
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    color: '#a9a9a9',
    fontSize: 18,
    marginBottom: 25,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 25,
    shadowColor: '#fff',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  icon: {
    marginRight: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 18,
  },
  footerText: {
    color: '#bbb',
    fontSize: 16,
    textAlign: 'center',
  },
});
