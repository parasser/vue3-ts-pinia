/**    加密：跳转页面使用
 *     对前端页面跳转携带的参数加密
 *         返回值时 加密后的字符串
 * @param queryObj:前端页面跳转时携带的参数
 */
export function encodeParam(queryObj: any) {
  // 序列化参数
  const stringifyObj = JSON.stringify(queryObj);
  // 返回加密结果
  return window.btoa(stringifyObj);
}

/**
 *    解密：目标页面使用
 *        返回解密后的对象
 * @param query：跳转页面传入的参数值
 */
export function decodeParam(query: string) {
  if (query) {
    // 1、解密
    const decodeStr = decodeURIComponent(window.atob(query));
    //  2、将解密后的字符串转为对象
    let decodeObj = JSON.parse(decodeStr);
    return decodeObj;
  }
  return {};
}
