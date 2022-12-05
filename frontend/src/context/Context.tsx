import { useReducer, createContext } from "react";
import { userReducer } from "./reducers/Reducer";

//TYPEs

type userInfos = {
    userId: string | null;
    username: string | null;
    email: string | null;
    subscribed_newsletter: boolean
}

type userData = {
    isConnected: boolean;
    userInfos: userInfos;
}

type InitialStateType = {
    userData: userData; 
}

// initial state
const initialState = {
    userData : {
        isConnected: !!sessionStorage.getItem('JWT'),
        userInfos: {
            userId: sessionStorage.getItem('userId'),
            username: null,
            email: null,
            subscribed_newsletter: false
        }
    }
};

const Context = createContext<{ 
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
  }>
  ({
    state: initialState,
    dispatch: () => null
  });


// combine reducer function
const combineReducers = (...reducers : any[]) => (state: any, action: any) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};


const Provider = ({ children } : any) => {
    const [state, dispatch] = useReducer(combineReducers(userReducer), initialState);
  
    return (
      <Context.Provider value={{state, dispatch}}>
        { children }
      </Context.Provider>
    )
}

export { Context, Provider };