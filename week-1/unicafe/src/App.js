import {useState} from 'react'

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const StatisticLine = ({attribute, value}) => {
  return (
    <tr>
      <td>{attribute}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return (
    <>
      <h1><b>statistics</b></h1>
      <table>
        <tbody>
          <StatisticLine attribute={"good"} value={props.good}/>
          <StatisticLine attribute={"neutral"} value={props.neutral}/>
          <StatisticLine attribute={"bad"} value={props.bad}/>
          <StatisticLine attribute={"all"} value={props.all}/>
          <StatisticLine attribute={"average"} value={props.average}/>
          <StatisticLine attribute={"positive"} value={props.positive}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all 
  const positive = `${(good / all) * 100}%`

  const goodOnClick = () => setGood(good + 1)
  const neutralOnClick = () => setNeutral(neutral + 1)
  const badOnClick = () => setBad(bad + 1)

  const noFeedback = good === 0 && neutral === 0 && bad === 0

  return (
    <div>
      <h1><b>give feedback</b></h1>
      <div>
        <Button onClick={goodOnClick} name={"good"}/>
        <Button onClick={neutralOnClick} name={"neutral"}/>
        <Button onClick={badOnClick} name={"bad"}/>
      </div>
      {noFeedback 
        ?
        <h1>no feedback given</h1>
        :
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      }
    </div>
  )
}

export default App;
