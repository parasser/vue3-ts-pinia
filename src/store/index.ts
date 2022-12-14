import { tagsStore } from "../store/tagsStore";
import { userStore } from "../store/useStore";

export interface IAppStore {
  userStore: ReturnType<typeof userStore>;
  tagsStore: ReturnType<typeof tagsStore>;
}

const appStore: IAppStore = {} as IAppStore;

// 注册store
export const registerStore = () => {
  appStore.tagsStore = tagsStore();
  appStore.userStore = userStore();
};

export default appStore;
