import { Entry } from '../types';
import DiaryEntry from '../components/DiaryEntry';

const DiaryEntries = ({ diaryEntries } : { diaryEntries: Entry[] }) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      <ul>
        {diaryEntries.map((e) => {
          return <DiaryEntry key={e.id} diaryEntry={e} />;
        })}
      </ul>
    </div>
  );
};

export default DiaryEntries;
