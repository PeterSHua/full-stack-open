import { useState } from 'react';
import diaryService from '../services/diaryService';

import { Entry, NewEntry } from '../types';

interface Props {
  diaryEntries: Entry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}
const NewDiaryEntryForm = ({ diaryEntries, setDiaryEntries }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    diaryService
      .createEntry(newDiaryEntry as NewEntry)
      .then((entry) => {
        setDiaryEntries(diaryEntries.concat(entry));
      });
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={addEntry}>
        <div>
          date
          <input
            type="text"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type="text"
            name="visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather
          <input
            type="text"
            name="weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm;
