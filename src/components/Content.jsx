import { useState, useEffect } from "react";
import { findAll, save, deleteRecord } from "../infrastructure/repo";

export default function Content() {
    const [records, setRecords] = useState();
    const [err, setErr] = useState("");
    const [title, setText] = useState("");
    const [time, setTime] = useState(0);

    const changeText = event => setText(event.target.value);
    const changeTime = event => setTime(parseInt(event.target.value));
    const registerRecord = () => {
      if(title === "" || time <= 0){
        setErr("入力されていない項目があります")
        return;
      }
      setRecords([...records,  { title: title, time: parseInt(time)}]);
      save({ title: title, time: parseInt(time)});
      setText("");
      setTime(0);
      setErr("")
    }
    const removeRecord = async id => {
        await deleteRecord(id);
        setRecords(await findAll());
    }

    const allTime = () => {
      return records.reduce((total, record) => total + parseInt(record.time), 0);
    }

    const fetchRecords = async () => {
        const records = await findAll();
        setRecords(records);
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    if(!records){
        return <div>読み込み中...</div>;
    }

    return (
      <>
        <div>
          <h1>学習記録一覧</h1>
        <div>
          <span>学習内容</span>
          <input value={title} onChange={changeText}/>
        </div>
        <div>
          <span>学習時間</span>
          <input type="number" value={time} onChange={changeTime} />
          <span>時間</span>
        </div>
        <p>入力されている学習内容：{title}</p>
        <p>入力されている学習時間：{time}</p>
        <p></p>
        {records.map((record) =>(
            <div key={record.id}>
                <button style={{color: "red"}} onClick={() => removeRecord(record.id)}>削除</button>
                <span>{record.title} {record.time}時間</span>
            </div>
        ))}
        <br />
        <button onClick={registerRecord}>登録</button>
        <p>合計時間：{allTime()}/1000(h)</p>
        <p>{err}</p></div>
      </>
    );
}