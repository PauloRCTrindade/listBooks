// eslint-disable-next-line import/no-anonymous-default-export
export function FavoritesIconRedux(state = [], action) {

  switch (action.type) {
    case 'FAVORITES_ICONS':
      return action.payload
      
    default:
      return state

  }

}