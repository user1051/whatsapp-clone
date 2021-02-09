export const initialState = {
    user: null,                 // how data layer looks at initail state
};

export const actionTypes = {
    SET_USER: "SET_USER",     // pushing user into data layer when signed in
};

// when action gets dispatched into dl then we switch/listen to it
const reducer = (state, action) => {
    console.log(action)
    switch (action.type){
      case actionTypes.SET_USER:
        return{
        ...state,    // keep the state of data layer
        user: action.user,  // change the user to whatever we dispatched
    };
    default:
        return state;       // if it is not user fallback to default state
    }  
};
    
export default reducer;
    