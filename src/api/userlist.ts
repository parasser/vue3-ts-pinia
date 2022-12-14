import request from '../utils/request'
interface UserListData {
  offset:number;
  limit: number;
}
type PromiseRes<T = {}> = Promise<ManageResult<T>>
interface ManageResult<T>{
  code: number,
  data: T,
  message: string
}
interface UserListRes{
  items: {}[];
  total: number
}
// 获取用户列表
export const userListApi = (data:UserListData):PromiseRes<UserListRes> => request.get('/v1/admin/users', { params: data})
