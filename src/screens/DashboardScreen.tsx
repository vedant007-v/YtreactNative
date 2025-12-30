import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

// Import LanguageSwitcher
import LanguageSwitcher from '../components/LanguageSwitcher';

// Your imports
import MetricCard from '../components/cards/MetricCard';
import { fetchUsers } from '../services/api';
import { calculateMetrics } from '../utils/calculations';
import { DashboardMetrics, User } from '../types';

// Import i18n configuration
import '../services/i18n';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const data = await fetchUsers();
      setUsers(data.users);
      const calculatedMetrics = calculateMetrics(data.users);
      setMetrics(calculatedMetrics);
    } catch (err) {
      setError(t('dashboard.error'));
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>{t('dashboard.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.retryText} onPress={loadData}>
          {t('dashboard.retry')}
        </Text>
      </View>
    );
  }

  if (!metrics) return null;

  // Prepare chart data with translated labels
  const genderChartData = [
    {
      name: t('dashboard.gender.male'),
      population: metrics.genderDistribution.male,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
    },
    {
      name: t('dashboard.gender.female'),
      population: metrics.genderDistribution.female,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
    },
  ];

  const ageChartData = {
    labels: [
      t('dashboard.ageGroups.18_25'),
      t('dashboard.ageGroups.26_35'),
      t('dashboard.ageGroups.36_50'),
      t('dashboard.ageGroups.50_plus'),
    ],
    datasets: [
      {
        data: [
          metrics.ageDistribution['18-25'],
          metrics.ageDistribution['26-35'],
          metrics.ageDistribution['36-50'],
          metrics.ageDistribution['50+'],
        ],
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Language Switcher */}
      <LanguageSwitcher />

      <Title style={styles.header}>{t('dashboard.title')}</Title>

      {/* Summary Metrics Cards */}
      <View style={styles.metricsRow}>
        <MetricCard 
          title={t('dashboard.metrics.totalUsers')} 
          value={metrics.totalUsers} 
          icon="👥" 
        />
        <MetricCard 
          title={t('dashboard.metrics.adminUsers')} 
          value={metrics.totalAdmins} 
          icon="👑" 
        />
      </View>
      <View style={styles.metricsRow}>
        <MetricCard 
          title={t('dashboard.metrics.maleUsers')} 
          value={metrics.totalMale} 
          icon="👨" 
        />
        <MetricCard 
          title={t('dashboard.metrics.femaleUsers')} 
          value={metrics.totalFemale} 
          icon="👩" 
        />
        <MetricCard 
          title={t('dashboard.metrics.avgAge')} 
          value={metrics.averageAge} 
          icon="🎂" 
        />
      </View>

      {/* Charts Section */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>{t('dashboard.charts.genderDistribution')}</Title>
          <PieChart
            data={genderChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>{t('dashboard.charts.ageDistribution')}</Title>
          <BarChart
            data={ageChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
            showValuesOnTopOfBars
          />
        </Card.Content>
      </Card>

      {/* Country Distribution - Keep country names from API */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>{t('dashboard.charts.usersByCountry')}</Title>
          <View style={styles.countryList}>
            {Object.entries(metrics.countryDistribution)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([country, count]) => (
                <View key={country} style={styles.countryItem}>
                  <Text style={styles.countryName}>📍 {country}</Text>
                  <Text style={styles.countryCount}>{count} {t('dashboard.metrics.totalUsers').toLowerCase()}</Text>
                </View>
              ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

// Chart configuration
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginVertical: 15,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chartCard: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  countryList: {
    marginTop: 10,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryName: {
    fontSize: 16,
  },
  countryCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryText: {
    color: '#2196F3',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default DashboardScreen;