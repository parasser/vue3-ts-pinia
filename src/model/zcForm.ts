import { StyleValue } from "vue";

export interface RuleItem {
  type?: string;
  required?: boolean;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  len?: number;
  enum?: Array<string | number | boolean | null | undefined>;
  whitespace?: boolean;
  fields?: Record<string, any>;
  options?: any;
  defaultField?: any;
  transform?: (value: any) => any;
  message?: string | ((a?: string) => string);
  asyncValidator?: (
    rule: any,
    value: any,
    callback: (error?: string | Error) => void,
    source: any,
    options: any
  ) => void | Promise<void>;
  trigger?: string;
  validator?: (
    rule: any,
    value: any,
    callback: (error?: string | Error) => void,
    source: any,
    options: any
  ) => any | void;
}
type IFormType = "input" | "password" | "select" | "datepicker" | "number";

interface ZCFormItem {
  // 名称
  label?: string;
  // 输入框type类型
  type?: IFormType;

  // 校验规则
  rules?: RuleItem[];
  // 表单绑定的名称
  prop?: string;
  // 下拉选择的值
  valueEnum?: {};
  // 下拉宽度
  width?: number | string;
  otherOptions?: {
    // 清除图标
    clearable?: boolean;
    // 禁用
    disabled?: boolean;
    // 多选
    multiple?: boolean;
    //   无内容显示文字
    placeholder?: string;
    [x: string]: any;
  };
}
/**
 * 配置
 */
export interface ZCForm {
  //表单配置项
  formItems: ZCFormItem[];
  // label宽度
  labelWidth?: string;
  itemColLayout?: { span: number };
  itemStyle?: StyleValue;
}
