import React from 'react';


const Menu = ({ isOpen, children, close, ...props }) => (
  <ul
    {...props}
    sx={{
      display: [isOpen ? 'flex' : 'none', null, 'flex'],
      position: ['fixed', null, 'static'],
      overflowY: ['scroll', null, 'visible'],
      top: [0, 0, 100],
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: ['column', null, 'row'],
      alignItems: 'center',
      listStyle: 'none',
      bg: ['background', null, 'transparent'],
      zIndex: 1000,
    }}
  >
    <li
      sx={{
        display: ['list-item', null, 'none'],
        width: '100%',
        textAlign: 'right',
        py: 4,
        px: 3,
      }}
    >
      <Close onClick={close} />
    </li>
    {children}
  </ul>
);

export default Menu;
