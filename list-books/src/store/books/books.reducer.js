// eslint-disable-next-line import/no-anonymous-default-export
export function ListReducers (state = "", action) {

  switch (action.type) {
    case 'BOOKS':
      return action.payload
    default:
      return state
  }

}