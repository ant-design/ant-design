export type Dictionary<T> = { [id: string]: T };

function getRootFontSize() {
    const def = 16;
    if (typeof window !== 'undefined') {
        const documentFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        if (isNaN(documentFontSize)) {
            return def;
        }
        return documentFontSize;
    }
    return def;
}

// convert rems to px using document font size
export function convertRemToPx(rem: number): string {
    return `${rem * getRootFontSize()}px`;
}
export function convertRemStrToPx(remStr: string): string {
    return convertRemToPx(parseFloat(remStr));
}

// convert px to rems using document font size
export function convertPixelsToRem(px: number): string {
    return `${px / getRootFontSize()}rem`;
}
export function convertPixelsStrToRem(pxStr: string): string {
    return convertPixelsToRem(parseFloat(pxStr));
}

export function strIncludesIgnoreCase(filter: string, value: string) {
    return value.toLowerCase().includes(filter.toLowerCase());
}
