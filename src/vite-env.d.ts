/// <reference types="vite/client" />

declare module '*.csv' {
  const content: string;
  export default content;
}

declare module '*.nc' {
  const content: string;
  export default content;
}

declare module '*.h5' {
  const content: string;
  export default content;
}
