export declare const matchKeyRegExp: RegExp;
export declare function matchKeyFromString(content: string): string[];
export declare function matchLangKeys(path: string, verbose?: boolean): Promise<string[]>;
export interface ExtractOptions {
    /**
     * glob pattern
     */
    in?: string;
    /**
     * keys out dir
     */
    out?: string;
    /**
     * enabled verbose log
     */
    verbose?: boolean;
}
export declare function extract(options?: ExtractOptions): Promise<void>;
