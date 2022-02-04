import React, { FC, memo, useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { thoughts as thoughtActions } from '../../actions';
import { Thought } from '../../store/rxdb/schemas/thought';
import { useLoadedDB } from '../../hooks/useDB';
import { format, startOfYesterday} from 'date-fns';
import { makeStyles } from '@material-ui/core';
import produce from 'immer';
import { useLatestThought } from '../../hooks/useLatestThought';
import Item from './Item';
import { StageContext } from './context';

const useStyles = makeStyles((_theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 140px)',
    padding: 20,
    paddingTop: 0,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  itemHeader: {
    fontWeight: 600,
    fontSize: 20,
    margin: '5px 0',
    textAlign: 'center',
  },
}));

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : undefined,
  padding: 8,
});

export interface WrapperProps {
  className?: string;
  activeThoughts: Thought[];
  backlogThoughts: Thought[];
}

export const Wrapper: FC<WrapperProps> = ({
  activeThoughts,
  backlogThoughts,
}) => {
  const classes = useStyles();
  const [state, setState] = useState(() => ({ activeThoughts, backlogThoughts }));
  const { db } = useLoadedDB();
  const latestThought = useLatestThought();
  const onRemoveThought = (thoughtId: string) => {
    setState(prev => produce(prev, (draftState) => {
      draftState.activeThoughts = draftState.activeThoughts.filter(({ id }) => {
        return id !== thoughtId;
      });
      draftState.backlogThoughts = draftState.backlogThoughts.filter(({ id }) => {
        return id !== thoughtId;
      });

      return draftState;
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const column = result.source.droppableId === 'active' ? state.activeThoughts : state.backlogThoughts;
    const item = column[result.source.index];
    const newItem = {
      ...item,
      stagedOn: result.destination.droppableId === 'active'
        ? format(new Date(), 'yyyy-MM-dd')
        : format(startOfYesterday(), 'yyyy-MM-dd'),
      stageIndex: result.destination.index + 1,
    };
    const newActive = state.activeThoughts.filter(({ id }) => id !== item.id);
    const newBacklog = state.backlogThoughts.filter(({ id }) => id !== item.id);

    if (result.destination.droppableId === 'active') {
      newActive.splice(result.destination.index, 0, newItem);
    } else {
      newBacklog.splice(result.destination.index, 0, newItem);
    }

    setState({
      activeThoughts: newActive,
      backlogThoughts: newBacklog,
    });

    thoughtActions.editThought(db, {
      ...newItem,
    });
  };

  const onDragStart = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };
  
  useEffect(() => {
    if (
      latestThought?.stagedOn &&
      latestThought.status !== 'completed') {
      setState(prev => produce(prev, (draftState) => {
        if (draftState.activeThoughts.concat(draftState.backlogThoughts).find(({ id }) => {
          return id === latestThought.id;
        })) {
          return draftState;
        }
        draftState.activeThoughts.unshift(latestThought);
        return draftState;
      }));
    }
  }, [latestThought]);

  useEffect(() => {
    state.activeThoughts.forEach((item, idx) => {
      if (item.stageIndex - 1 !== idx) {
        thoughtActions.editThought(db, {
          ...item,
          stageIndex: idx + 1,
        });
      }
    });

    state.backlogThoughts.forEach((item, idx) => {
      if (item.stageIndex - 1 !== idx) {
        thoughtActions.editThought(db, {
          ...item,
          stageIndex: idx + 1,
        });
      }
    });
  }, [state]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <StageContext.Provider value={onRemoveThought}>
        <div className={classes.root}>
          <h2 className={classes.itemHeader}>Active</h2>
          <Droppable droppableId="active">
            {(provided, snapshot) => (
              <div
                className={classes.itemList}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state.activeThoughts.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Item provided={provided} item={item} isDragging={snapshot.isDragging} style={provided.draggableProps.style} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <h2 className={classes.itemHeader}>Backlog</h2>
          <Droppable droppableId="backlog">
            {(provided, snapshot) => (
              <div
                className={classes.itemList}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state.backlogThoughts.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Item provided={provided} item={item} isDragging={snapshot.isDragging} style={provided.draggableProps.style} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </StageContext.Provider>
    </DragDropContext>
  );
};

export default memo(Wrapper);
