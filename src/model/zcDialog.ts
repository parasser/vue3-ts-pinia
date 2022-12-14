import { ZCTableOption } from "./zcTable";

/**
 * 配置
 */
export interface ZCDialog {
  //表格配置项
  column?: ZCTableOption[];
  // 是否显示索引列
  showIndexColumn?: boolean;
  // 是否显示多选框
  showSelectColumn?: boolean;
  // 是否展示搜索栏
  showSearch?: boolean;
  // 是否有子数据，树形数据才用得到
  childrenProps?: object;
  // dialog标题
  title?: string;
  // dialog宽度
  width?: string;
  // 是否打开第二层弹窗
  openOtherDialog?: boolean;
  // 第二层弹窗title
  secondTitle?: string;
  // 第二层弹窗宽度
  secondWidth?: string;
  // 第二层弹窗内容
  secondContent?: string;
}
