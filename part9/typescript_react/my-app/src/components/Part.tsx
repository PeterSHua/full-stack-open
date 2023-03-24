import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
};

const Part = ({ coursePart } : { coursePart : CoursePart }): JSX.Element => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <i>{coursePart.description}</i>
        </>
      );
    case "group":
      return (
        <>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          Group Project Count:  {coursePart.groupProjectCount}
        </>
      );
    case "background":
      return(
        <>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          {coursePart.backgroundMaterial}
        </>
      );
    case "special":
      return (
        <>
          <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
          <i>{coursePart.description}</i><br />
          Required skills: {coursePart.requirements.join(', ')}
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
