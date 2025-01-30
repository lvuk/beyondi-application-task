export interface Metrics {
  totalUsers: number;
  totalAdmins: number;
  totalRegularUsers: number;
  usersWithProducts: number;
  usersWithoutProducts: number;
  mostActiveUsers: { id: number; email: string; productCount: number }[];
  totalProducts: number;
  avgProductsPerUser: number;
  productsPerCountry: { country: string; productCount: number }[];
  usersWithResetCode: number;
  adminPercentage: number;
  passwordResetPercentage: number;
  popularProductNames: { name: string; productCount: number }[];
  topAddresses: {
    street: string;
    city: string;
    country: string;
    productCount: number;
  }[];
}
