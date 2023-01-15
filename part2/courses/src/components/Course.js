import Content from './Content';
import Header from './Header';

const Course = ({ name, parts }) => {
  return (
    <>
      <Header header={name}></Header>
      <Content content={parts}></Content>
    </>
  )
}

export default Course;
