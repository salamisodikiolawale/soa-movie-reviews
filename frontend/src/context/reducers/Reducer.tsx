export function userReducer(state: any, action: any) {
    switch (action.type) {
      case "SET_USER_DATA":
        return { ...state, userData: action.payload };
      default:
        return state;
    }
}