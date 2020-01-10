import { combineReducers } from '@reduxjs/toolkit'
import connections from './connections';
import notes from './notes';
import pictures from './pictures';
import plans from './plans';
import settings from './settings';
import sortFilterSettings from './sortFilterSettings';
import statuses from './statuses';
import statusesByThought from './statusesByThought';
import displayThoughtSettings from './displayThoughtSettings';
import displayPriorities from './displayPriorities';
import tags from './tags';
import templates from './templates';
import thoughts from './thoughts';
import stage from './stage';
import tutorial from './tutorial';
import customTheme from './customTheme';

const rootReducer = combineReducers({
  connections,
  notes,
  pictures,
  plans,
  settings,
  sortFilterSettings,
  statuses,
  statusesByThought,
  tags,
  templates,
  thoughts,
  stage,
  displayPriorities,
  displayThoughtSettings,
  tutorial,
  customTheme,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
