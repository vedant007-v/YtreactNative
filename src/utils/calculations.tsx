import { User, DashboardMetrics } from '../types';

export const calculateMetrics = (users: User[]): DashboardMetrics => {
  // Total counts
  const totalUsers = users.length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalMale = users.filter(u => u.gender === 'male').length;
  const totalFemale = users.filter(u => u.gender === 'female').length;
  
  // Average age
  const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers;
  
  // Gender distribution
  const genderDistribution = {
    male: totalMale,
    female: totalFemale
  };
  
  // Age distribution
  const ageGroups = { '18-25': 0, '26-35': 0, '36-50': 0, '50+': 0 };
  users.forEach(user => {
    if (user.age >= 18 && user.age <= 25) ageGroups['18-25']++;
    else if (user.age <= 35) ageGroups['26-35']++;
    else if (user.age <= 50) ageGroups['36-50']++;
    else ageGroups['50+']++;
  });
  
  // Department distribution
  const departmentDistribution: Record<string, number> = {};
  users.forEach(user => {
    const dept = user.company.department;
    departmentDistribution[dept] = (departmentDistribution[dept] || 0) + 1;
  });
  
  // Country distribution
  const countryDistribution: Record<string, number> = {};
  users.forEach(user => {
    const country = user.address.country;
    countryDistribution[country] = (countryDistribution[country] || 0) + 1;
  });
  
  return {
    totalUsers,
    totalAdmins,
    totalMale,
    totalFemale,
    averageAge: Number(averageAge.toFixed(1)),
    genderDistribution,
    ageDistribution: ageGroups,
    departmentDistribution,
    countryDistribution
  };
};