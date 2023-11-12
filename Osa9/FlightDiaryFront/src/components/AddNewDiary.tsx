import { useState } from "react"
import axios from "axios";
import { DiaryEntry, Visibility, Weather, NewDiaryEntry } from "../types";

interface AddNewDiaryTypes {
  addNew(arg: DiaryEntry): void
}

type messageType = string | null

const AddNewDiary = ( props: AddNewDiaryTypes ) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('great')
  const [weather, setWeather] = useState('sunny')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState<messageType>(null);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const data: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment
    }

    try {
      const res = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', data)
      props.addNew(res.data)
      setComment('')
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setMessage(error.response.data)
          setTimeout( () => {
            setMessage(null)
          }, 2000)
        }
      } else {
        console.error(error)
      }
    }
  }

  return (
    <>
    {message && <p>{message}</p>}
    <form onSubmit={handleSubmit}>
      <div>
        date
        <input
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
        />
      </div>

      <div>
        Visibility
        great <input 
          type='radio' 
          value='great' 
          checked={visibility === 'great'}
          onChange={({ target }) => setVisibility(target.value)}
          />

        good <input 
          type='radio' 
          value='good' 
          checked={visibility === 'good'}
          onChange={({ target }) => setVisibility(target.value)}
          />

        ok <input 
          type='radio' 
          value='ok' 
          checked={visibility === 'ok'}
          onChange={({ target }) => setVisibility(target.value)}
          />

        poor <input 
          type='radio' 
          value='poor' 
          checked={visibility === 'poor'}
          onChange={({ target }) => setVisibility(target.value)}
          />
      </div>

      <div>
        Weather
        sunny <input 
          type='radio' 
          value='sunny' 
          checked={weather === 'sunny'}
          onChange={({ target }) => setWeather(target.value)}
          />

        rainy <input 
          type='radio' 
          value='rainy' 
          checked={weather === 'rainy'}
          onChange={({ target }) => setWeather(target.value)}
          />

        cloudy  <input 
          type='radio' 
          value='cloudy' 
          checked={weather === 'cloudy'}
          onChange={({ target }) => setWeather(target.value)}
          />

        stormy <input 
          type='radio' 
          value='stormy' 
          checked={weather === 'stormy'}
          onChange={({ target }) => setWeather(target.value)}
          />

        windy <input 
          type='radio' 
          value='windy' 
          checked={weather === 'windy'}
          onChange={({ target }) => setWeather(target.value)}
          />
          
      </div>

      <div>
      comment<input
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
        />
      </div>
      <button type='submit'>Add</button>

    </form>
    </>
  )


}

export default AddNewDiary