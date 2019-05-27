import React, { useEffect, useState } from 'react';
import PhaseHeader from './PhaseHeader';
import PhaseInput from './PhaseInput';
import PhaseSelect from './PhaseSelect';
import PhaseDate from './PhaseDate';
import PhaseDescription from './PhaseDescription';
import PhaseNext from './PhaseNext';
import Notes from '@material-ui/icons/Notes';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { useNestedXReducer } from '../../hooks/useXReducer';

export const Phase1 = React.memo(({ classes, onNext, isFocus, onReady, onFocus, createdThought, dispatch }) => {
  const [title, setTitle] = useNestedXReducer('title', createdThought, dispatch);
  const [typeOptions, setTypeOptions] = useNestedXReducer('typeOptions', createdThought, dispatch);
  const [type, setType] = useNestedXReducer('type', createdThought, dispatch);
  const [date, setDate] = useNestedXReducer('date', createdThought, dispatch);
  const [time, setTime] = useNestedXReducer('time', createdThought, dispatch);
  const [description, setDescription] = useNestedXReducer('description', createdThought, dispatch);
  const [focusDescription, setFocusDescription] = useState(false);

  const isReady = validateInputs(title, type, date, description);

  const handleNext = () => {
    setFocusDescription(false);
    onNext();
  };

  useEffect(() => {
    onReady(isReady);
  }, [isReady]);

  return (
    <div className={`${classes.phase} ${classes.phase1} ${isFocus ? ' isFocus' : ''}`}>
      {!isFocus && 
        <PhaseHeader classes={classes} value={'Edit'} onClick={onFocus}/>}
      {(!focusDescription || !isFocus) &&
        <PhaseInput id={'title'} classes={classes} value={title} onChange={e => setTitle(e.target.value)} label={'Title'} autoFocus/>}
      {!focusDescription && isFocus &&
        <PhaseSelect id={'type'} classes={classes} value={type} options={typeOptions} onChange={e => setType(e.target.value)} label={'Type'}/>}
      {!focusDescription && isFocus &&
        <PhaseDate id={'date'} classes={classes} value={date} onChange={e => setDate(e.target.value)} label={'Date'}/>}
      {!focusDescription && isFocus &&
        <PhaseDate id={'time'} time classes={classes} value={time} onChange={e => setTime(e.target.value)} label={'Time'}/>}
      {focusDescription &&
        <button className={classes.hideDescriptionButton} aria-label={'Hide Description'} onClick={() => setFocusDescription(false)}><ExpandLess/></button>}
      {isFocus && 
        <PhaseDescription id={'description'} classes={classes} value={description} onFocus={() => setFocusDescription(true)} onChange={e => setDescription(e.target.value)} label={'Description'}/>}
      {isFocus && isReady && 
        <PhaseNext classes={classes} onClick={handleNext} label={'Add Notes'} id={'add-notes'} Icon={Notes}/>}
    </div>
  );
});

export default Phase1;

const validateInputs = (title, type, date, description) => {
  return title !== '';
};
