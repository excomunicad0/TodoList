import React, { useContext } from 'react';
import { AppContext } from '../../app/provider/AppContext';
import CategoryItem from '../../entities/Category/ui/CategoryItem';

// import './CategoriesPage.css';

function CategoriesPage(): JSX.Element {
  const { categories } = useContext(AppContext);

  return (
    <div>
      <h1>Категории</h1>
      <ul>
        {categories &&
          categories.map((category) => (
            <li key={category.id}>
              <CategoryItem category={category} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
