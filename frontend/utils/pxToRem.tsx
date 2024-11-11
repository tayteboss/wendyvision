const globalRemBasis = 16;

const pxToRem = (pxSize: number): string => `${pxSize / globalRemBasis}rem`;

export default pxToRem;
