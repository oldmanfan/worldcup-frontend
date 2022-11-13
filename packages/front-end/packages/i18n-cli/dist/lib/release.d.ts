export interface ReleaseOptions {
    in?: string;
    out?: string;
    verbose?: boolean;
    langs: string[];
    default: string;
}
export declare function release(options: ReleaseOptions): Promise<void>;
