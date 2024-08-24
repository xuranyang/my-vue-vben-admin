import {defHttp, beHttp} from '/@/utils/http/axios'
import {LoginParams, LoginResultModel, GetUserInfoModel} from './model/userModel'

import {ErrorMessageMode} from '/#/axios'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // defHttp -> beHttp
  return beHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  // defHttp -> beHttp
  return beHttp.get<GetUserInfoModel>({url: Api.GetUserInfo}, {errorMessageMode: 'none'})
}

export function getPermCode() {
  return defHttp.get<string[]>({url: Api.GetPermCode})
}

export function doLogout() {
  // defHttp -> beHttp
  return beHttp.get({url: Api.Logout})
}

export function testRetry() {
  return defHttp.get(
    {url: Api.TestRetry},
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )
}
