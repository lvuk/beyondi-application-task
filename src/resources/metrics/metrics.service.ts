import { Not, IsNull } from 'typeorm';
import { db } from '../../database.config';
import { Address } from '../address/address.entity';
import { Product } from '../products/product.entity';
import { User, Role } from '../user/user.entity';
import { Metrics } from './metrics.interface';

export const getMetrics = async (): Promise<Metrics> => {
  const userRepo = db.getRepository(User);
  const productRepo = db.getRepository(Product);
  const addressRepo = db.getRepository(Address);

  // Total Users
  const totalUsers = await userRepo.count();
  const totalAdmins = await userRepo.count({ where: { role: Role.ADMIN } });
  const totalRegularUsers = totalUsers - totalAdmins;

  // Users with and without products
  const usersWithProducts = await userRepo
    .createQueryBuilder('user')
    .leftJoin('user.products', 'product')
    .where('product.id IS NOT NULL')
    .getCount();

  const usersWithoutProducts = totalUsers - usersWithProducts;

  // Most Active Users (Top 10)
  const mostActiveUsers = await userRepo
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.products', 'product')
    .select('user.id, user.email, COUNT(product.id) AS productCount')
    .groupBy('user.id')
    .orderBy('productCount', 'DESC')
    .limit(10)
    .getRawMany();

  // Total Products
  const totalProducts = await productRepo.count();

  // Average Products Per User (Avoid division by zero)
  const avgProductsPerUser = totalUsers > 0 ? totalProducts / totalUsers : 0;

  // Products Per Country
  const productsPerCountry = await addressRepo
    .createQueryBuilder('address')
    .leftJoin('address.products', 'product')
    .select('address.country, COUNT(product.id) AS productCount')
    .groupBy('address.country')
    .orderBy('productCount', 'DESC')
    .getRawMany();

  // Users Who Requested Password Reset
  const usersWithResetCode = await userRepo.count({
    where: { resetCode: Not(IsNull()) },
  });

  // Percentage of Admins
  const adminPercentage = totalUsers > 0 ? (totalAdmins / totalUsers) * 100 : 0;

  // Percentage of Users Who Requested Password Reset
  const passwordResetPercentage =
    totalUsers > 0 ? (usersWithResetCode / totalUsers) * 100 : 0;

  // Top 5 Most Popular Product Names
  const popularProductNames = await productRepo
    .createQueryBuilder('product')
    .select('product.name, COUNT(product.id) AS productCount')
    .groupBy('product.name')
    .orderBy('productCount', 'DESC')
    .limit(5)
    .getRawMany();

  // Addresses with Most Products (Top 5)
  const topAddresses = await addressRepo
    .createQueryBuilder('address')
    .leftJoin('address.products', 'product')
    .select(
      'address.street, address.city, address.country, COUNT(product.id) AS productCount'
    )
    .groupBy('address.id')
    .orderBy('productCount', 'DESC')
    .limit(5)
    .getRawMany();

  return {
    totalUsers,
    totalAdmins,
    totalRegularUsers,
    usersWithProducts,
    usersWithoutProducts,
    mostActiveUsers,
    totalProducts,
    avgProductsPerUser,
    productsPerCountry,
    usersWithResetCode,
    adminPercentage,
    passwordResetPercentage,
    popularProductNames,
    topAddresses,
  };
};
