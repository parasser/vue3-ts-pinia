export interface UserModel {
  access_token?: string;
  email?: string;
  info?: {};
  mobile?: string;
  nickname?: string;
  roles: Array<{name:string; desc: string}>;
  username: string;
}
export interface userMolde1 {
  username?: string;
}
export interface Meta {
  title?: string;
  icon?: string;
  roles?: any[];
  redirect?: any;
  needCache?: boolean;
  fixed?: boolean;
}
export interface MenuProps {
  path?: string;
  name?: string;
  redirect?: any;
  hidden?: boolean;
  component?: any;
  meta?: Meta;
  children?: Array<MenuProps>;
}
