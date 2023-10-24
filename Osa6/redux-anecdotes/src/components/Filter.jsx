import { useSelector, useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = ( event ) =>  dispatch({type: 'filter/changeFilter', payload: event.target.value})
  
    const style = {
      marginBottom: 15
    }
  
    return (
      <div style={style}>
        <span>Filter:</span>
        <input
          placeholder='Type here...'
          onChange={target => handleChange(target)}
        /> 
      </div>
    )
  }

export default Filter