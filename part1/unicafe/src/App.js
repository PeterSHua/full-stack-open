import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return "No feedback given";
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}></StatisticsLine>
        <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
        <StatisticsLine text="bad" value={bad}></StatisticsLine>
        <StatisticsLine text="all" value={good + neutral + bad}></StatisticsLine>
        <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)}></StatisticsLine>
        <StatisticsLine text="positive" value={(good - bad) / (good + neutral + bad)}></StatisticsLine>
      </tbody>
    </table>
  );
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
