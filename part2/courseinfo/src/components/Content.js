import Part from './components/Part';

const Content = (props) => {
  let { part1, exercises1 } = props;
  let { part2, exercises2 } = props;
  let { part3, exercises3 } = props;

  return (
    <div>
      <Part part={part1} count={exercises1} />
      <Part part={part2} count={exercises2} />
      <Part part={part3} count={exercises3} />
    </div>
  );
};

export default Content;
