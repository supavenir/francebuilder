import { createStore, Store } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import config from '../utils/config';

// https://github.com/VladymyrPylypchatin/nextjs-redux-boilerplate/tree/master/src/store/reducer

let jwtToken = null
if(typeof window !== 'undefined') {
  jwtToken = localStorage.getItem(config.localJwtKey);
}


const initialState = {
  jwtToken,
  userInfos: {
    username: null,
  },
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case HYDRATE:
      return { ...state, ...action.payload };
    
    case 'AUTHENTICATE':
      return { ...state, tick: action.payload };

    default:
      return state;
  }
}

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });