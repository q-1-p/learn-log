import { useState } from "react";

function App() {
  const [records, setRecords] = useState([]);
  const [err, setErr] = useState("");
  const [text, setText] = useState("");
  const [time, setTime] = useState(0);

  const changeText = event => setText(event.target.value);
  const changeTime = event => setTime(parseInt(event.target.value));
  const registerRecord = () => {
    if(text === "" || time <= 0){
      setErr("入力されていない項目があります")
      return;
    }
    setRecords([...records,  { title: text, time: parseInt(time)}]);
    setText("");
    setTime(0);
    setErr("")
  }
  const allTime = () => {
    let ret = 0;
    records.map((record) => (
      ret += parseInt(record.time)
    ))
    return ret;
  }

  return (
    <>
    <h1>学習記録一覧</h1>
    <div>
      <span>学習内容</span>
      <input value={text} onChange={changeText}/>
    </div>
    <div>
      <span>学習時間</span>
      <input type="number" value={time} onChange={changeTime} />
      <span>時間</span>
    </div>
    <p>入力されている学習内容：{text}</p>
    <p>入力されている学習時間：{time}</p>
    <p></p>
    {records.map((record) =>(
      <p>{record.title} {record.time}時間</p>
    ))}
    <button onClick={registerRecord}>登録</button>
    <p>合計時間：{allTime()}/1000(h)</p>
    <p>{err}</p>
    </>
  );
}

export default App;
