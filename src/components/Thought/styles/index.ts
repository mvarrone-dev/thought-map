import { StyleRules } from '@material-ui/core/styles';

export const thoughtHomeStyles = (theme: any): StyleRules => ({
  root: {
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.gray[700],
    '& #thought-loader': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  circleButton: {
    ...theme.defaults.circleButton,
    border: `2px solid ${theme.palette.primary[500]}`,
    backgroundColor: theme.palette.gray[600],
    opacity: 0.5,
    '&#return-home': {
      top: 10,
      right: 10,
    },
    '&#settings': {
      bottom: 10,
      left: 10,
      '& svg': {
        willChange: 'transform',
        transition: 'transform 0.3s linear',
        transform: 'rotate(-90deg)',
        '&.gear-opening': {
          transform: 'rotate(90deg) scale(2)',
        },
      },
    },
  },
});

export const thoughtInformationStyles = (theme: any): StyleRules => ({
  root: {
    display: 'grid',
    height: '100%',
    padding: 20,
    overflow: 'hidden',
    gridTemplateAreas: `"title title title"
                        "created-at updated-at ."
                        "sections sections sections"`,
    gridTemplateRows: 'max-content max-content 1fr',
    gridTemplateColumns: 'max-content max-content 1fr',
    gridGap: '10px',
    color: 'white',
  },
  thoughtTitle: {
    gridArea: 'title',
    fontSize: 24,
    color: theme.palette.primary[500],
    userSelect: 'none',
  },
  editTitleForm: {
    gridArea: 'title',
    fontSize: 24,
    display: 'flex',
    '& input': {
      width: '100%',
      fontSize: 24,
    },
  },
  inputLabel: {
    '&#title': {
      flex: 1,
    },
  },
  submitTitleButton: {
    flex: '0 0 35px',
    ...theme.defaults.centered,
    color: theme.palette.primary[500],
  },
  cancelTitleButton: {
    flex: '0 0 35px',
    ...theme.defaults.centered,
    color: theme.palette.red[500],
  },
  createdAt: {
    gridArea: 'created-at',
  },
  updatedAt: {
    gridArea: 'updated-at',
  },
  thoughtSections: {
    gridArea: 'sections',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  thoughtSection: {
    display: 'grid',
    gridTemplateAreas: `". . action-buttons"
                        "section-icon section-field quick-action"
                        "section-icon section-value quick-action"
                        ". . submit-action-buttons"`,
    gridTemplateRows: '20px max-content 1fr 20px',
    gridTemplateColumns: '50px 1fr 50px',
    gridColumnGap: '10px',
    backgroundColor: theme.palette.gray[200],
    borderRadius: '10px',
    color: 'black',
    margin: '10px 0',
    '&:last-child': {
      marginBottom: 100,
    },
  },
  editToggle: {
    gridArea: 'action-buttons',
    ...theme.defaults.centered,
    marginRight: 5,
    marginLeft: 'auto',
    '& > svg': {
      fontSize: 16,
    },
    '&.editting': {
      gridArea: 'submit-action-buttons',
    },
  },
  sectionIcon: {
    gridArea: 'section-icon',
    ...theme.defaults.centered,
  },
  sectionValue: {
    gridArea: 'section-value',
    fontSize: 18,
    fontWeight: 600,
  },
  sectionField: {
    gridArea: 'section-field',
    color: theme.palette.gray[400],
  },
  sectionQuickActionButton: {
    gridArea: 'quick-action',
    ...theme.defaults.centered,
    justifyContent: 'flex-start',
    '& > button': {
      ...theme.defaults.centered,
    },
  },
  completeThoughtButton: {
    color: theme.palette.primary[500],
    '& > svg': {
      background: 'black',
      borderRadius: '5px',
    },
    '&.firstAction': {
      color: 'gold',
    },
  },
  sectionEditForm: {
    gridArea: 'section-value',
    fontSize: 18,
    '& input': {
      width: '100%',
    },
    '& select': {
      width: '100%',
    },
    '& textarea': {
      width: '100%',
      resize: 'none',
      height: 100,
    },
  },
  highPriorityButton: {
    color: theme.palette.red[500],
    '& > svg': {
      background: 'black',
      borderRadius: '5px',
    },
  },
  itemList: {
    gridArea: 'section-value',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  noteItem: {
    fontWeight: 600,
    paddingBottom: 10,
    '&:not(:first-child)': {
      paddingTop: 10,
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid black',
    },
  },
  quickAddButton: {
    color: theme.palette.primary[500],
    '& > svg': {
      background: 'black',
      borderRadius: '5px',
    },
  },
  addModal: {
    '& #tag-select': {
      '& select': {
        width: '100%',
      },
    },
  },
  quickAddForm: {
    display: 'grid',
    gridTemplateAreas: `"input input input"
                        ". submit cancel"`,
    gridTemplateRows: 'max-content max-content',
    gridTemplateColumns: '1fr max-content max-content',
    gridGap: 10,
    '& #quick-add': {
      gridArea: 'input',
      '& input': {
        width: '100%',
      },
    },
  },
  submitQuickAddButton: {
    gridArea: 'submit',
    color: theme.palette.primary[500],
    backgroundColor: 'black',
    cursor: 'pointer',
    fontWeight: 600,
    border: '1px solid black',
    padding: '2px 5px',
    borderRadius: '4px',
    '&:disabled': {
      color: 'white',
      backgroundColor: 'transparent',
      border: '1px solid white',
    },
  },
  cancelQuickAddButton: {
    gridArea: 'cancel',
    color: 'white',
    padding: '2px 5px',
  },
  editableItem: {
    display: 'flex',
    marginBottom: 10,
    '& #quick-item-edit': {
      flex: 1,
      '& input': {
        height: '100%',
      },
    },
  },
  deleteItemButton: {
    ...theme.defaults.centered,
    color: theme.palette.red[500],
  },
  quickItem: {

  },
});
