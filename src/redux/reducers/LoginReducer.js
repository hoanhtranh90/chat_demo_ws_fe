const initialState = {
    info:{
        user:''
    },
    auth:'',
    userOnRoom:[],
    
};
export const LoginReducer = (state = initialState,action) => {

    switch(action.type){
        case "LOGIN":
        {
            const info = action.payload
            // const info = data.data
            state.auth = info.user.role.role
            // const info = data.data.user
            localStorage.setItem("token",info.token)
            localStorage.setItem("id",info.user.id)
            return {...state,info};
        }
        case "LOGOUT":
        {
            state.info = {user:''}
            state.auth =''
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            return {...state}
        }
        case "AUTH_REFRESH":
        {
            const info = action.payload
            state.auth = info.user.role.role
            return {...state,info}
        }
        case "ADD_USER_ON_ROOM":
        {
            const userOnRoom = [...state.userOnRoom,action.payload]
            return{...state,userOnRoom}
        }
        default:
            break;
    }

    return {...state};

}