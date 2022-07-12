import React from 'react'
import { sortByAlphabet, sortByRating  } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import "./Style.scss";

const Sort = () => {

  const dispatch = useDispatch()

  function  sortByInput(e){
    let value = e.target.value;
    let direction = value.endsWith('asc') ? "asc" : "desc";

    if (value.startsWith('rating')){
       dispatch(sortByRating(direction))
    }else {
        dispatch(sortByAlphabet(direction));
    }
}

  return (
    <div className="select sort">
      <select  onChange={e => sortByInput(e)}>
          <option value="" disabled selected>Sort by</option>
          <option value='rating_asc'>Rating - Lowest to Highest</option>
          <option value='rating_desc'>Rating - Highest to Lowest</option>
          <option value='alphabet_asc'>Alphabet - A-Z</option>
          <option value='alphabet_desc'>Alphabet - Z-A</option>
      </select>
    </div>
    )
}

export default Sort