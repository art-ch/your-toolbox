// CSS Modules
declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// Global CSS (side-effect imports)
declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// SCSS support (if needed)
declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}
