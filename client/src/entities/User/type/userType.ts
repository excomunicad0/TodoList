export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// вырезал ID
export type UserWithoutId = Omit<User, 'id'>;

export type UserId = User['id'];

// авторизация
// export type UserData = {
//   email: string;
//   password: string;
// };

// export type UserAccessToken = {
//   user: User;
//   accessToken: string;
// };
