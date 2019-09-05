import React, { FC } from 'react';
import { withStyles, StyleRules } from '@material-ui/styles';
import Home from '@material-ui/icons/Home';
import CircleButton from '../../General/CircleButton';
import ManagePhotos from './manage-photos';
import AppConfiguration from './app-configuration';
import { AppState } from '../../../reducers';
import useApp from '../../../hooks/useApp';

interface AppSettingsProps {
  classes: any,
  state: AppState,
}

const styles = (theme: any): StyleRules => ({
  root: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  circleButton: {
    ...theme.defaults.circleButton,
    '&#return-home': {
      left: 10,
      bottom: 10,
    },
  },
});

export const AppSettings: FC<AppSettingsProps> = ({ classes, state }) => {
  const { history } = useApp();
  const handleClickReturnHome = () => history.goBack();

  return (
    <div className={classes.root}>
      <ManagePhotos pictures={state.pictures}/>
      <AppConfiguration />
      <CircleButton
        classes={classes}
        id={'return-home'}
        onClick={handleClickReturnHome}
        label={'Return Home'}
        Icon={Home}
      />
    </div>
  );
};

export default withStyles(styles)(AppSettings);
