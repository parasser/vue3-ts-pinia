import request from '../utils/request'
import { UserModel } from "../model/userModel";
interface adminLoginData {
  username:string;
  password: string;
}
type PromiseRes<T = {}> = Promise<ManageResult<T>>
interface ManageResult<T>{
  code: number,
  data: T,
  message: string
}
interface AdminLoginRes{
  token: string
}
interface RegisterUserData {
  username: string;
  email?: string;
  verificationCode?: string;
  password?: string;
}
interface SendVerifyCodeData {
  email: string
}
interface ResetPasswordData {
  password: string;
  email: string;
  code: string
}
// 登录
export const adminLoginApi = (data:adminLoginData):PromiseRes<AdminLoginRes> => request.post('/v1/user/login', data)
// 获取用户信息
export const getInfo = ():PromiseRes<UserModel> => request.get('/v1/user/profile')
// 注册
export const registerUser = (data:RegisterUserData):PromiseRes => request.post('/v1/user/register', data)

// 检查用户名是否可用
export const CheckUsername = (data:RegisterUserData):PromiseRes =>
request.post('/v1/user/check_username', data)
// 发送验证码
export const SendVerifyCode = (data:SendVerifyCodeData):PromiseRes => request.get('/v1/user/verify', { params:data })
// 忘记密码重置密码
export const ResetPassword = (data:ResetPasswordData) => request.post('/v1/user/reset_password', data)