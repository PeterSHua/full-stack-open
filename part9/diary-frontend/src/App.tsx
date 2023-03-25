import axios from 'axios';
import { useEffect, useState } from "react";
import {
  Weather,
  Visibility,
  Entry,
  NewEntry,
} from './types';

import DiaryEntries from "./components/DiaryEntries";
import NewDiaryEntryForm from './components/NewDiaryEntryForm';
import diaryService from './services/diaryService';

const baseUrl = 'http://localhost:3001';

const App = () => {
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: ''
  });

  const [diaryEntries, setDiaryEntries] = useState<Entry[]>([
    {
      id: 1,
      date: '1991',
      weather: Weather.Windy,
      visibility: Visibility.Poor,
      comment: 'testing'
    },
    {
      id: 2,
      date: '2021',
      weather: Weather.Stormy,
      visibility: Visibility.Good,
      comment: 'another test'
    }
  ]);

  useEffect(() => {
    diaryService.getAllEntries()
      .then((diaryEntries) => {
        setDiaryEntries(diaryEntries);
      });
  }, []);

  return (
    <div>
      <NewDiaryEntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
      />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
