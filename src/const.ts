export const SERVICE_IGNORES = "__AJANUW_RXSERVICE_IGNORES__";
export const SERVICE_LATE = "__AJANUW_RXSERVICE_LATE__";
export const SERVICE_CONFIG = "__AJANUW_RXSERVICE_CONFIG__";
export const DEBOUNCE_TIME = 10;
export const RFLAG = {

  /**
   * 还未在池中初始化
   */
  NINIT: 1,

  /**
   * 在池中已经存在
   */
  EXIST: 1 << 1,

  /**
   * 激活状态
   */
  ACTIVE: 1 << 2,

  /**
   * 销毁状态
   */
  DESTROY: 1 << 3,

  /**
   * 保持数据
   */
  KEEP: 1 << 4,
};
