import { CoursePart } from '../types';
import Part from './Part';

const Content = (
  { courseParts } : { courseParts: CoursePart[] }
): JSX.Element => {
  return (
    <>
      {courseParts.map((coursePart, idx) => {
        return <Part key={idx} coursePart={coursePart} />;
      })}
    </>
  );
};

export default Content;
