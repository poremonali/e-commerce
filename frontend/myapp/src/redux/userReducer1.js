const initialState={
    user:{}
}
export const userReducer1 = (state=initialState,action)=>
{
    switch (action.type){
        case"LOGIN_SUCCESS":
            return{
                ...state,user:action.payload
            };
        case "LOGIN_ERROR":
            return initialState;
        default:
            return initialState;
    }

}