/* tslint:disable */
/* eslint-disable */

export class Item {
    free(): void;
    [Symbol.dispose](): void;
    get_name(): string;
    get_price(): number;
    constructor(name: string, price: number);
}

export class ShoppingCart {
    free(): void;
    [Symbol.dispose](): void;
    add_item(name: string, price: number): void;
    calculate_total(promo_type: string, promo_value: number): number;
    check_for_confetti(promo_type: string, promo_value: number): string;
    clear(): void;
    generate_receipt(promo_type: string, promo_value: number): string;
    get_discount_amount(promo_type: string, promo_value: number): number;
    get_item_count(): number;
    get_items_json(): string;
    get_subtotal(): number;
    constructor();
    remove_item(name: string): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_item_free: (a: number, b: number) => void;
    readonly __wbg_shoppingcart_free: (a: number, b: number) => void;
    readonly item_get_name: (a: number) => [number, number];
    readonly item_get_price: (a: number) => number;
    readonly item_new: (a: number, b: number, c: number) => number;
    readonly shoppingcart_add_item: (a: number, b: number, c: number, d: number) => void;
    readonly shoppingcart_calculate_total: (a: number, b: number, c: number, d: number) => number;
    readonly shoppingcart_check_for_confetti: (a: number, b: number, c: number, d: number) => [number, number];
    readonly shoppingcart_clear: (a: number) => void;
    readonly shoppingcart_generate_receipt: (a: number, b: number, c: number, d: number) => [number, number];
    readonly shoppingcart_get_discount_amount: (a: number, b: number, c: number, d: number) => number;
    readonly shoppingcart_get_item_count: (a: number) => number;
    readonly shoppingcart_get_items_json: (a: number) => [number, number];
    readonly shoppingcart_get_subtotal: (a: number) => number;
    readonly shoppingcart_new: () => number;
    readonly shoppingcart_remove_item: (a: number, b: number, c: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
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
