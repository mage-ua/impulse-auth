export const excludeProps = (obj: any, props: string[]): any => {
  if (typeof obj !== 'object') return;
  if (obj === null || Array.isArray(obj)) return;

  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
};
