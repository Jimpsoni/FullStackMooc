import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

import Diaries from "./components/Diaries";
import AddNewDiary from "./components/AddNewDiary";

import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries')
    .then(res => setDiaries(res.data as DiaryEntry[]))
  }, []);

  const addNew = (data: DiaryEntry): void => {
    setDiaries(diaries.concat(data))
  }


  return (
    <>
      <h2>Add new Diary</h2>
      <AddNewDiary addNew={addNew}/>
      <h2>Diary Entries</h2>
      <Diaries diaries={diaries}/>
    </>
  );
};

export default App;
