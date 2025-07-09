// Local type declarations for development
// This allows the example-usage.tsx file to import from "simplify-captcha" during development

declare module "simplify-captcha" {
  import React from "react";

  export interface SimplifyCaptchaProps {
    onMessage: (event: { nativeEvent: { data: string } }) => void;
    style?: React.CSSProperties;
    className?: string;
  }

  export interface SimplifyCaptchaRef {
    show: () => void;
    hide: () => void;
  }

  export const SimplifyCaptcha: React.ForwardRefExoticComponent<
    SimplifyCaptchaProps & React.RefAttributes<SimplifyCaptchaRef>
  >;

  export function injectStyles(): void;
}
