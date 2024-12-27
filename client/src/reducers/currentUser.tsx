const currentUser = (state: string | null = null, action: {[key: string]: string}) =>{
    switch (action.type) {
        case 'CHANGE_CURRENT_USER':
            return (
              {userName: action.userName,
               userId: action.userId,})
        default:
            return state;
    }
}

export default currentUser;