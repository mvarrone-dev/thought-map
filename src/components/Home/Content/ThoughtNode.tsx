import React, { useCallback, FC } from 'react';
import useApp from '../../../hooks/useApp';
import { useLoadedDB } from '../../../hooks/useDB';
import Select from '../../General/Select';
import { STATUS_OPTIONS } from '../../Thought';
import { thoughts as thoughtActions } from '../../../actions';
import { homeUrl } from '../../../lib/util';
import { Thought } from 'store/rxdb/schemas/thought';

interface ThoughtNodeProps {
  classes: any,
  thought: Thought,
}

const STATUS_TO_COLOR: { [key: string]: string } = {
  'new': 'gold',
  'in progress': 'lightgreen',
  'almost done': 'green',
  'completed': 'midnightblue',
};

const colorFromPriority = (priority: number): string => {
  if (priority === 10) return 'red';
};

const styleFromPriority = (priority: number): { color?: string, fontWeight?: number } => {
  if (priority === 10) {
    return {
      color: colorFromPriority(priority),
      fontWeight: 600,
    };
  }

  return {};
};

export const ThoughtNode: FC<ThoughtNodeProps> = React.memo(({ classes, thought }) => {
  const { history } = useApp();
  const db = useLoadedDB();

  const handleClick = () => {
    history.push(`${homeUrl(history)}thought/${thought.id}`);
  };

  const handleChangeStatus = useCallback(event => {
    thoughtActions.editThought(db, Object.assign({}, thought, {
      status: event.target.value,
    }));
  }, []);

  return (
    <div className={classes.thoughtNode}>
      <span className={classes.thoughtNodeTitle} onClick={handleClick} style={styleFromPriority(thought.priority)}>{thought.title}</span>
      <Select
        id={'status-select'}
        classes={classes}
        value={thought.status}
        options={STATUS_OPTIONS}
        onChange={handleChangeStatus}
        style={{
          backgroundColor: STATUS_TO_COLOR[thought.status],
        }}
      />
    </div>
  );
});

export default ThoughtNode;