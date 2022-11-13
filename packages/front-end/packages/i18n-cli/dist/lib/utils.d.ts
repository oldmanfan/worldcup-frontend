export declare function getFiles(pattern: string): Promise<string[]>;
export declare function readFile(filename: string): Promise<string>;
export declare function saveFile(filename: string, content: string): Promise<string>;
/**
 * 输出国际化词条key文件
 * @param path 文件路径
 * @param keys 词条数组
 */
export declare function saveKeys(path: string, keys: string[]): Promise<void>;
/**
 * 输出国际化翻译文件
 * @param path 文件路径
 * @param keys 翻译对象key-value
 */
export declare function saveMaps(path: string, keys: Record<string, string>): Promise<void>;
export declare function deduplicationSortKeys(keys: string[]): string[];
export declare function keepDir(dir: string): void;
export declare function existsSync(dir: string): boolean;
