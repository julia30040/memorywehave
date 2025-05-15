declare module 'react-image-lightbox' {
  import { ComponentType } from 'react';

  interface LightboxProps {
    mainSrc: string;
    nextSrc?: string;
    prevSrc?: string;
    onCloseRequest: () => void;
    onMovePrevRequest?: () => void;
    onMoveNextRequest?: () => void;
    // Add other props as needed
  }

  const Lightbox: ComponentType<LightboxProps>;

  export default Lightbox;
} 