"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.matchLangKeys = exports.matchKeyFromString = exports.matchKeyRegExp = void 0;
const path_1 = require("path");
const utils_1 = require("./utils");
exports.matchKeyRegExp = /(\{#.*?#\})/g;
function matchKeyFromString(content) {
    const arr = content.match(exports.matchKeyRegExp)?.map(item => item.replace(/^{#|#}$/g, ''));
    return arr || [];
}
exports.matchKeyFromString = matchKeyFromString;
async function matchLangKeys(path, verbose) {
    if (!path) {
        throw new Error('path is required');
    }
    const files = await (0, utils_1.getFiles)(path);
    if (verbose) {
        console.debug(`matchLangKeys glob pattern="${path}", matches length=${files.length} files=${JSON.stringify(files)}`);
    }
    let keys = [];
    for await (const file of files) {
        const content = await (0, utils_1.readFile)(file);
        const arr = matchKeyFromString(content);
        // keys = keys.concat(await matchLangKeys(file));
        keys = keys.concat(arr);
    }
    const result = (0, utils_1.deduplicationSortKeys)(keys);
    if (verbose) {
        console.debug(`matchLangKeys length="${keys.length}", deduplicationKeys length=${result.length}`);
    }
    return result;
}
exports.matchLangKeys = matchLangKeys;
const defaultOptions = {
    in: 'src/**/*.{ts{,x},js{,x},vue}',
    out: './lang',
    verbose: false,
    // langOut: './locales/lang',
};
async function extract(options) {
    const opts = Object.assign({}, options, defaultOptions);
    const keys = await matchLangKeys(opts.in, options?.verbose);
    // Check if the directory does not exist then create a new one
    (0, utils_1.keepDir)(opts.out);
    // 保存
    const savePath = (0, path_1.join)(opts.out, 'keys.json');
    if (options?.verbose) {
        console.debug('saveKeys keys, opts.out=', savePath);
    }
    await (0, utils_1.saveKeys)(savePath, keys);
    // out zh-cn.json
    // const keyObj: Record<string, string> = keys.reduce((prev, curr) => {
    //   prev[curr] = curr;
    //   return prev;
    // }, {});
    // const langDir = './locales/lang';
    // if (!fs.existsSync(langDir)) {
    //   fs.mkdirSync(langDir, { recursive: true });
    // }
    // const langOut = path.join(langDir, 'zh-cn.json');
    // await outLangFile(langOut, keyObj);
}
exports.extract = extract;
