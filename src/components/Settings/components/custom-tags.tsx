import React, { FC, useMemo, useState, FormEvent } from 'react';
import { withStyles, StyleRules } from '@material-ui/styles';
import { AppState } from '../../../reducers';
import { useModalDynamicState } from '../../../hooks/useModal';
import Input from '../../General/Input';
import { settings as settingsActions } from '../../../actions';
import { useLoadedDB } from '../../../hooks/useDB';
import Delete from '@material-ui/icons/Delete';
import { openConfirmation } from '../../../lib/util';

interface CustomTagsProps {
  classes: any;
  onClose: () => void;
}

const styles = (theme: any): StyleRules => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    '& button': {
      fontWeight: 600,
      cursor: 'pointer',
      marginLeft: 30,
      color: 'white',
    },
  },
  inputLabel: {
    flex: 1,
    '& input': {
      width: '100%',
    },
  },
  customTag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customTagText: {

  },
  deleteCustomTag: {
    color: theme.palette.red[500],
  },
});

export const CustomTags: FC<CustomTagsProps> = ({ classes, onClose }) => {
  const state: AppState = useModalDynamicState();
  const [inputtedValue, setInputtedValue] = useState<string>('');
  const db = useLoadedDB();
  const customTags = useMemo(() => {
    return Array.isArray(state.settings.customTags) ? state.settings.customTags : [];
  }, [state.settings]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputtedValue('');
    const next = customTags.concat(inputtedValue);
    settingsActions.createSetting(db, {
      field: 'customTags',
      value: next,
    });
  };

  const deleteCustomTag = (value: string) => async () => {
    const next = customTags.filter(prev => prev !== value);
    const deleteCustomTag = () => {
      settingsActions.createSetting(db, {
        field: 'customTags',
        value: next,
      });
    };
    
    openConfirmation('Are you sure you want to delete this?', deleteCustomTag);
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Input
          classes={classes}
          value={inputtedValue}
          onChange={e => setInputtedValue(e.target.value)}
          autoFocus
        />
        <button>Create</button>
      </form>
      {customTags.map(tag => {
        return (
          <div key={tag} className={classes.customTag}>
            <span className={classes.customTagText}>{tag}</span>
            <button className={classes.deleteCustomTag} onClick={deleteCustomTag(tag)}><Delete/></button>
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(CustomTags);