"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.release = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const defaultOptions = {
    in: './lang/keys.json',
    out: './lang',
    verbose: false,
    langs: ['zh-hk', 'en-us'],
    default: 'zh-hk',
};
async function release(options) {
    const opts = Object.assign({}, options, defaultOptions);
    if (options.verbose) {
        console.debug(`readFile in="${opts.in}"...`);
    }
    const content = await (0, utils_1.readFile)(opts.in);
    const keys = JSON.parse(content);
    if (options.verbose) {
        console.debug(`readFile keys.length="${keys.length}".`);
    }
    // out zh-cn.json
    for await (const lang of opts.langs) {
        if (options.verbose) {
            console.debug(`loop release, lang="${lang}".`);
        }
        const idDefaultLang = lang === opts.default;
        const langOut = path_1.default.join(opts.out, `${lang}.json`);
        //
        let currKeyObj = {};
        if ((0, utils_1.existsSync)(langOut)) {
            if (options.verbose) {
                console.debug(`loop release, read exist file, path="${langOut}".`);
            }
            const langContent = await (0, utils_1.readFile)(langOut);
            currKeyObj = JSON.parse(langContent);
            if (options.verbose) {
                console.debug(`loop release, read exist file, currKeyObj.length"${Object.keys(currKeyObj).length}".`);
            }
        }
        //
        const keyObj = keys.reduce((prev, curr) => {
            // eslint-disable-next-line no-param-reassign
            prev[curr] = currKeyObj[curr] || (idDefaultLang ? curr : '');
            return prev;
        }, {});
        if (options.verbose) {
            console.debug(`loop release, save keyMap,langOut=${langOut} length="${Object.keys(keyObj).length}".`);
        }
        (0, utils_1.keepDir)(opts.out);
        await (0, utils_1.saveMaps)(langOut, keyObj);
    }
}
exports.release = release;
