// eslint-disable-next-line import/no-anonymous-default-export
export function FavoritesBooksRedux(state = [], action) {

  switch (action.type) {
    case 'FAVORITES_BOOKS':
      return action.payload
      
    default:
      return state

  }

}