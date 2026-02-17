/* tslint:disable */
/* eslint-disable */

export class TipCalculator {
    free(): void;
    [Symbol.dispose](): void;
    calculate_per_person(): number;
    calculate_tip(): number;
    calculate_tip_per_person(): number;
    calculate_total(): number;
    get_summary(): string;
    constructor();
    set_bill(amount: number): void;
    set_num_people(people: number): void;
    set_tip_percentage(percentage: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_tipcalculator_free: (a: number, b: number) => void;
    readonly tipcalculator_calculate_per_person: (a: number) => number;
    readonly tipcalculator_calculate_tip: (a: number) => number;
    readonly tipcalculator_calculate_tip_per_person: (a: number) => number;
    readonly tipcalculator_calculate_total: (a: number) => number;
    readonly tipcalculator_get_summary: (a: number) => [number, number];
    readonly tipcalculator_new: () => number;
    readonly tipcalculator_set_bill: (a: number, b: number) => void;
    readonly tipcalculator_set_num_people: (a: number, b: number) => void;
    readonly tipcalculator_set_tip_percentage: (a: number, b: number) => void;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
