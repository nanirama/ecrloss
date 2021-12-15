import React from 'react';

const MenuItem = ({ children, vertical = false, dropdown = false, ...props }) => (
  <li
    {...(dropdown && { className: 'dropdown' })}
    {...props}
    sx={{
      textAlign: ['center', null, 'left'],
      ml: vertical ? 0 : [0, null, 4],
      mt: vertical ? 3 : [3, null, 0],
      '&:first-of-type': {
        ml: 0,
        mt: [3, 3, 0],
      },
      fontSize: [vertical ? 3 : 4, null, 1],
      '&.dropdown': {
        position: 'relative',
      },
      '&.dropdown:hover .dropdown-content': {
        display: 'block',
      },
      '& a': {
        color: 'menu.grey',
        fontWeight: 'bold',
      },
      '& a.active, & a:hover': {
        borderBottom: (theme) => `3px solid ${theme.colors.accent}`,
      },
    }}
  >
    {children}
  </li>
);

export default MenuItem;
