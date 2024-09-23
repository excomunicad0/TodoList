import React, { useContext } from 'react';
import type { Category } from '../type/categoryType';
import { AppContext } from '../../../app/provider/AppContext';

// import './CategoryItem.css';

type CategoryItemProps = {
  category: Category;
};

function CategoryItem({ category }: CategoryItemProps): JSX.Element {
  const { categories } = useContext(AppContext);

  return (
    <div>
      <h3>{category.name}</h3>
    </div>
  );
}

export default CategoryItem;
