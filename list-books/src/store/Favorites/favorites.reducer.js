// eslint-disable-next-line import/no-anonymous-default-export
export function Favorites(state = "", action) {

  switch (action.type) {
    case 'FAVORITES':
      return action.payload
      
    default:
      return state

  }

}