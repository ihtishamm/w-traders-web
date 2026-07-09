import { fakeUsers, User } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { UserTable } from './user-tables';
import { columns } from './user-tables/columns';

export default async function UserListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const roles = searchParamsCache.get('role');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(roles && { roles })
  };

  const data = await fakeUsers.getUsers(filters);
  const totalUsers = data.total_users;
  const users: User[] = data.users;

  return (
    <UserTable data={users} totalItems={totalUsers} columns={columns} />
  );
}
