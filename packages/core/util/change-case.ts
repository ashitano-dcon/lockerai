type ChangeCase = (str: string) => string;

export const toTitleCase: ChangeCase = (str) =>
  str
    .split('-')
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(' ');

export const toKebabCase: ChangeCase = (str) => str.toLowerCase().replace(/\s/g, '-');

export const toPascalCase: ChangeCase = (str) => {
  const titleCase = toTitleCase(str);
  return titleCase[0]!.toUpperCase() + titleCase.slice(1);
};
