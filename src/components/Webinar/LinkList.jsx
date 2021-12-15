import React from 'react';

import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'gatsby';

const defaultRenderItem = (item) => (
  <a href={item.url} target={item.target} sx={{ color: 'menu.grey' }}>
    {item.label}
  </a>
);

const LinkList = ({ items, renderItem = defaultRenderItem }) => (
  <ul sx={{ listStyle: 'none', mb: 5 }}>
    {items.map((item) => (
      <li
        key={shortid.generate()}
        sx={{ mb: 3, fontSize: 1, fontWeight: 'bold' }}
      >
        {renderItem(item)}
      </li>
    ))}
  </ul>
);

LinkList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default LinkList;
