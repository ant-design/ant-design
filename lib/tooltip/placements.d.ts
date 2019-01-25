export interface AdjustOverflow {
    adjustX?: 0 | 1;
    adjustY?: 0 | 1;
}
export interface PlacementsConfig {
    arrowWidth?: number;
    horizontalArrowShift?: number;
    verticalArrowShift?: number;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: any;
}
export declare function getOverflowOptions(autoAdjustOverflow: any): any;
export default function getPlacements(config?: PlacementsConfig): any;
