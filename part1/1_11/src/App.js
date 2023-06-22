import { useState } from 'react'


const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, all, average } = props;
  return all === 0 ? (
    <div>No feedback given</div>
  ) : (
    <div>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={`${(average * 100).toFixed(1)}%`}/>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0);

  const onGoodClick = () => {
    const myGood = good + 1;
    setGood(myGood);
    const myAll = all + 1;
    setAll(myAll);
    setAverage(1 * myGood / myAll - 1 * bad / myAll);
  }

  const onNeutralClick = () => {
    setNeutral(neutral + 1);
    const myAll = all + 1;
    setAll(myAll);
    setAverage(1 * good / myAll - 1 * bad / myAll);
  }

  const onBadClick = () => {
    const myBad = bad + 1;
    setBad(myBad);
    const myAll = all + 1;
    setAll(myAll);
    setAverage(1 * good / myAll - 1 * bad / myAll);
  }

  return (
    <div>
      <div>
        <br/>
        <strong>give feedback</strong>
        <br/>
        <br/>
      </div>
      <div>
        <Button onClick={onGoodClick} text="good"/>
        <Button onClick={onNeutralClick} text="neutral"/>
        <Button onClick={onBadClick} text="bad"/>
      </div>
      <div>
        <br/>
        <strong>statistics</strong>
        <br/>
        <br/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>
    </div>
  )
}

export default App