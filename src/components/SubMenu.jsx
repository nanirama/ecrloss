const SubMenu = ({ children, ...props }) => (
  <ul
    {...props}
    sx={{
      display: ['flex', null, 'none'],
      flexDirection: 'column',
      alignItems: 'center',
      position: ['static', null, 'absolute'],
      top: 3,
      left: 0,
      width: '100%',
      backgroundColor: 'background',
      '& a': {
        color: ['grey', null, 'text'],
      },
      boxShadow: [
        'none',
        null,
        '0 30px 50px -20px rgba(0, 0, 0, 0.37), 0 20px 30px -10px rgba(0, 0, 0, 0.3)',
      ],
      // transform: (theme) => ['none', null, `translateX(-${theme.space[3]}px)`],
      minWidth: [0, null, '150px'],
      listStyle: 'none',
      // border: theme => `1px solid ${theme.colors.grey}`,
      p: [0, null, 3],
      zIndex: 100,
    }}
  >
    {children}
  </ul>
);

export default SubMenu;
