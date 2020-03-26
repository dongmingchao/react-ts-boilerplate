import { CheckMeta } from "./interface";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export default interface propTypes {
  /** 快捷选项 */
  options: CheckMeta[];
  /** 点击checkbox时触发 */
  onChange?(index: number, e: CheckboxChangeEvent): void;
  /** 返回值number测试 */
  testRetNum?(index: number, e: CheckboxChangeEvent): number[];
}
