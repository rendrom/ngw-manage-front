export type ValidateFunc = (
  rule: Record<string, any>,
  value: any,
  callback: (error?: Error) => void,
) => void;
