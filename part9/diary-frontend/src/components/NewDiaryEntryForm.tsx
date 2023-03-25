import { useState } from 'react';
import diaryService from '../services/diaryService';

import { Entry, NewEntry, Visibility, Weather } from '../types';

interface Props {
  diaryEntries: Entry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}
const NewDiaryEntryForm = (
  {
    diaryEntries,
    setDiaryEntries,
    setNotification
  }: Props
) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiaryEntry: NewEntry = {
      date,
      visibility,
      weather,
      comment
    };

    const data = await diaryService.createEntry(newDiaryEntry);

    if (data) {
      if (typeof data === 'string') {
        setNotification(data);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      } else if ("id" in data && "date" in data && "weather" in data && "visibility" in data) {
        setDiaryEntries(diaryEntries.concat(data));
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={addEntry}>
        <div>
          date
          <input
            type="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility:
          <span>
            great
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Great)}
            />
            good
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Good)}
            />
            ok
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Ok)}
            />
            poor
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility(Visibility.Poor)}
            />
          </span>
        </div>
        <div>
          weather:
          <span>
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Sunny)}
            />
            rainy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Rainy)}
            />
            cloudy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Cloudy)}
            />
            stormy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Stormy)}
            />
            windy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather(Weather.Windy)}
            />
          </span>
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
