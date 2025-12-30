// User interface based on dummyjson.com API response
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  role: 'admin' | 'user' | 'moderator';
  company: {
    name: string;
    department: string;
    title: string;
  };
  address: {
    city: string;
    country: string;
  };
}

// API response structure
export interface ApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Dashboard metrics you'll calculate
export interface DashboardMetrics {
  totalUsers: number;
  totalAdmins: number;
  totalMale: number;
  totalFemale: number;
  averageAge: number;
  genderDistribution: { male: number; female: number };
  ageDistribution: { '18-25': number; '26-35': number; '36-50': number; '50+': number };
  departmentDistribution: Record<string, number>;
  countryDistribution: Record<string, number>;
}