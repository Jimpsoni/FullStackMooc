import { DiaryEntry } from "../types";

interface DiaryPartTypes {
  diaries: DiaryEntry[]
}

const Diaries = (prop: DiaryPartTypes) => {
  const content = prop.diaries

  return (
    <>
      { 
        content.map((d) => (
          <div key={d.date}>
            <div><b>{d.date}</b></div>
            <div>Visibility: {d.visibility}</div>
            <div>Weather: {d.weather}</div>
            <br/>
          </div>
        ))
      }
    </>
  )
}

export default Diaries