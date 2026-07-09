////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of User data
export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const roles = ['Admin', 'Editor', 'Viewer', 'Member'];
      const statuses = ['active', 'inactive'];
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        id,
        name: `${firstName} ${lastName}`,
        email: faker.internet
          .email({ firstName, lastName })
          .toLowerCase(),
        role: faker.helpers.arrayElement(roles),
        status: faker.helpers.arrayElement(statuses),
        avatar_url: faker.image.avatar(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional role filtering and search
  async getAll({ roles = [], search }: { roles?: string[]; search?: string }) {
    let users = [...this.records];

    // Filter users based on selected roles
    if (roles.length > 0) {
      users = users.filter((user) => roles.includes(user.role));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: ['name', 'email', 'role']
      });
    }

    return users;
  },

  // Get paginated results with optional role filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    roles,
    search
  }: {
    page?: number;
    limit?: number;
    roles?: string;
    search?: string;
  }) {
    await delay(1000);
    const rolesArray = roles ? roles.split(',') : [];
    const allUsers = await this.getAll({
      roles: rolesArray,
      search
    });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  },

  // Get a specific user by its ID
  async getUserById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the user by its ID
    const user = this.records.find((user) => user.id === id);

    if (!user) {
      return {
        success: false,
        message: `User with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `User with ID ${id} found`,
      user
    };
  }
};

// Initialize sample users
fakeUsers.initialize();
