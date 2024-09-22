export type Category = {
  id: number;
  name: string;
};

export type CategoryWithoutId = Omit<Category, 'id'>;

export type CategoryId = Category['id'];
