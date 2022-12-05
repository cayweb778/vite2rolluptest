import {useUserStore} from "/@/store/modules/user";
import moment from "moment";
import {useCompanyOperateStoreWidthOut} from "/@/store/modules/operate-company";
import {setAuthCache} from "/@/utils/auth";

export async function setupTokenData(){
  function hasTokenData(){
    return window.localStorage.getItem('tokenData')!=null
  }
  if(hasTokenData()){
    const userStore = useUserStore();
    const result=JSON.parse(window.localStorage.getItem('tokenData'))
    // await pushUserState(result.content)
    const date = moment().format('YYYY-MM-DD')
    userStore.setToken(result.loginInfo.content.token)
    userStore.setState(result.loginInfo.content)
    useCompanyOperateStoreWidthOut().commitLoginDate(date);
    // helloPlatformId
    const id=window.localStorage.getItem('newPlatformId')
    setAuthCache("currentLayoutId",id)
  }

}
