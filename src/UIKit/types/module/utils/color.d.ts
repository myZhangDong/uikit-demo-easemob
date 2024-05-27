declare function hexToHsla(hex: string): string | null;
declare function generateColors(baseColor: string, lights?: number[]): string[];
declare const isHueValue: (value: number) => boolean;
declare const isHexColor: (value: string) => boolean;
export { hexToHsla, generateColors, isHueValue, isHexColor };
