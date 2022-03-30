import React from 'react';
import cn from 'classnames';

let themeColor: Obj<string> = {};

export interface ErdaIconProps<T = any> {
  className?: string;
  type: string; // unique identification of icon
  style?: React.CSSProperties;
  size?: string | number; // size of svg with default value of 1rem. Use width and height if width-to-height ratio is not 1
  color?: T; // color of svg
  onClick?: React.MouseEventHandler;
}

const ErdaIcon = ({ type, color, className, style, onClick, size }: ErdaIconProps) => {
  const classes = cn(className, 'erda-icon');
  const sizeWithUnit = typeof size === 'string' || Number.isNaN(Number(size)) ? size : `${size ?? 20}px`;
  const styleProps = {
    width: sizeWithUnit,
    height: sizeWithUnit,
    color: themeColor[color] ?? 'currentColor',
    ...style,
  };
  return (
    <svg className={classes} aria-hidden="true" style={styleProps} onClick={onClick}>
      <use xlinkHref={`#icon-${type}`} />
    </svg>
  );
};

ErdaIcon.themeColor = themeColor;

const insertScripts = (scriptUrls: string[]) => {
  const scripts: HTMLScriptElement[] = [];

  for (let i = 0; i < scriptUrls.length; i++) {
    const script = document.createElement('script');
    script.src = scriptUrls[i];
    script.async = true;
    document.body.appendChild(script);
    scripts.push(script);
  }
  return scripts;
};

export const useErdaIcon = (props?: { url?: string | string[]; colors?: Obj<string> }) => {
  if (props?.colors) {
    themeColor = props.colors;
  }

  React.useLayoutEffect(() => {
    const scriptUrls = props?.url ? (Array.isArray(props.url) ? props.url : [props.url]) : [];
    scriptUrls.push('//at.alicdn.com/t/font_1538246_9a270phpjyn.js');
    const scripts = insertScripts(scriptUrls);
    return () => {
      scripts.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, [props?.url]);
};

export default ErdaIcon;