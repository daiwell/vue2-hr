const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token:state=>state.user.token,
  userId:state=>state.user.userInfo.userId,
  name:state=>state.user.userInfo.name,
  staffPhoto:state=>state.user.userInfo.staffPhoto

}
export default getters
