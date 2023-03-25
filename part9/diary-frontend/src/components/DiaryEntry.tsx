import { Entry } from '../types';

const DiaryEntry = ({ diaryEntry } : { diaryEntry: Entry }) => {
  return (
    <li>
      <h2>{diaryEntry.date}</h2>
      visibility: {diaryEntry.visibility} <br />
      weather: {diaryEntry.weather}
    </li>
  );
};

export default DiaryEntry;
