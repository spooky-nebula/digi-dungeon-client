declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.proto';

declare module 'query-string' {
  export function parse(str: string): Object;
  export function stringify(obj: Object): string;
  export function extract(str: string): string;
}
