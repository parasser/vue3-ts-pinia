import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

export interface ZCTableOption extends Partial<TableColumnCtx<any>> {
  slotName?: string;
  show?: boolean;
  valueEnum?: any;
}

/**
 * 配置
 */
export interface ZCTable {
  //表格配置项
  column: ZCTableOption[];
  // 是否显示索引列
  showIndexColumn?: boolean;
  // 是否显示多选框
  showSelectColumn?: boolean;
  // 是否展示搜索栏
  showSearch?: boolean;
  // 是否有子数据，树形数据才用得到
  childrenProps?: object;
}
