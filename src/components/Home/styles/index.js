import './styles.css';

export const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'grid',
    padding: 20,
    backgroundColor: '#d2d2d2',
    gap: '20px',
    gridTemplateAreas: `"content header"
                        "content header"
                        "content settings-button"`,
    gridTemplateRows: 'repeat(3, 1fr)',
    gridTemplateColumns: 'repeat(2, 1fr)',
    /**
     * Small
     */
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: `"content content"
                          "settings-button settings-button"
                          "header header"`,
      gridTemplateRows: '7fr minmax(50px, 1fr) minmax(50px, 1fr)',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  content: {
    gridArea: 'content',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'auto',
    ...theme.defaults.castShadow.light,
    '& > h3': {
      fontWeight: 600,
    },
    '& > :not(:last-child)': {
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        borderBottom: '1px solid #0000003d',
        left: '20%',
        right: '20%',
        bottom: 0,
      },
    },
  },
  thoughtNode: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 10px',
    '& > #status-select': {
      marginLeft: 20,
      padding: '5px 0',
      backgroundColor: '#8380ff',      
      borderRadius: '10px',
      '& > select': {
        color: 'white',
        display: 'flex',
        textAlignLast: 'center',
        paddingLeft: 13,
        backgroundColor: 'transparent',
        border: 'none',
      },
    },
  },
  thoughtNodeTitle: {
    color: theme.palette.gray[500],
  },
  guideButton: {
    gridArea: 'guide-button',
    fontSize: 20,
    borderRadius: 20,
    color: 'white',
    backgroundColor: '#8380ff',
    ...theme.defaults.castShadow.light,
  },
  header: {
    gridArea: 'header',
    margin: 'auto',
    fontSize: 50,
    fontFamily: 'avenir',
    color: '#000072',
  },
  circleButton: {
    position: 'fixed',
    border: `2px solid ${theme.palette.primary[500]}`,
    top: 0,
    right: 0,
    margin: 30,
    height: 70,
    width: 70,
    borderRadius: '50%',
    backgroundColor: theme.palette.gray[600],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s linear',
    color: 'white',
    '&:hover': {
      transform: 'scale(1.1)',
      ...theme.defaults.castShadow.heavy,
    },
    '&:active': {
      transform: 'scale(1)',
      boxShadow: 'none',
    },
    /**
     * Small
     */
    [theme.breakpoints.down('sm')]: {
      top: 'unset',
      bottom: 0,
      transition: 'all 0.1s linear',
      ...theme.defaults.castShadow.heavy,
      '&:hover': {
        transform: 'unset',
      },
      '&.touched': {
        boxShadow: 'none!important',
        transform: 'scale(0.9)!important',
      },
    },
  },
  settingsButton: {
    gridArea: 'settings-button',
    fontSize: 20,
    borderRadius: 20,
    color: 'white',
    backgroundColor: '#8380ff',
    ...theme.defaults.castShadow.light,
  }
});
