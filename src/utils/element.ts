import { VNode } from 'vue';
import { ElMessage } from 'element-plus';
import type {
  IMessageOptions,
  IMessageHandle,
} from 'element-plus/lib/el-message/src/types';

enum ELMessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}
type EMssageContent = string | VNode;
type EIMessageOptions = Partial<IMessageOptions>;

export const message = {
  success(message: EMssageContent, options: EIMessageOptions): IMessageHandle {
    return ElMessage({
      type: ELMessageType.SUCCESS,
      message,
      ...options,
    });
  },
  error(message: EMssageContent, options?: EIMessageOptions): IMessageHandle {
    return ElMessage({
      type: ELMessageType.ERROR,
      message,
      ...options,
    });
  },
  warning(message: EMssageContent, options?: EIMessageOptions): IMessageHandle {
    return ElMessage({
      type: ELMessageType.WARNING,
      message,
      ...options,
    });
  },
  info(message: EMssageContent, options?: EIMessageOptions): IMessageHandle {
    return ElMessage({
      type: ELMessageType.INFO,
      message,
      ...options,
    });
  },
};
