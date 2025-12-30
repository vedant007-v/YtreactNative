import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      <Text style={styles.subtitle}>भाषा चुनें / ભાષા પસંદ કરો</Text>
      
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            i18n.language === lang.code && styles.activeLanguageButton
          ]}
          onPress={() => i18n.changeLanguage(lang.code)}
        >
          <View style={styles.languageContent}>
            <Text style={styles.languageName}>{lang.name}</Text>
            <Text style={styles.languageNative}>{lang.native}</Text>
          </View>
          {i18n.language === lang.code && (
            <Text style={styles.selectedText}>✓ Selected</Text>
          )}
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  languageButton: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeLanguageButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#1e88e5',
  },
  languageContent: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  languageNative: {
    fontSize: 16,
    color: '#666',
  },
  selectedText: {
    color: '#1e88e5',
    fontWeight: 'bold',
  },
});

export default LanguageSettingsScreen;