import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Language / भाषा / ભાષા:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, i18n.language === 'en' && styles.activeButton]}
          onPress={() => changeLanguage('en')}
        >
          <Text style={[styles.buttonText, i18n.language === 'en' && styles.activeButtonText]}>
            English
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, i18n.language === 'hi' && styles.activeButton]}
          onPress={() => changeLanguage('hi')}
        >
          <Text style={[styles.buttonText, i18n.language === 'hi' && styles.activeButtonText]}>
            हिंदी
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, i18n.language === 'gu' && styles.activeButton]}
          onPress={() => changeLanguage('gu')}
        >
          <Text style={[styles.buttonText, i18n.language === 'gu' && styles.activeButtonText]}>
            ગુજરાતી
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#1e88e5',
    borderColor: '#1e88e5',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#fff',
  },
});

export default LanguageSwitcher;