"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsSync = exports.keepDir = exports.deduplicationSortKeys = exports.saveMaps = exports.saveKeys = exports.saveFile = exports.readFile = exports.getFiles = void 0;
const fs = __importStar(require("fs"));
const glob_1 = __importDefault(require("glob"));
async function getFiles(pattern) {
    return new Promise((resolve, reject) => {
        (0, glob_1.default)(pattern, (err, matches) => {
            if (err) {
                reject(err);
            }
            resolve(matches);
        });
    });
}
exports.getFiles = getFiles;
function readFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
exports.readFile = readFile;
function saveFile(filename, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, (err) => {
            if (err) {
                reject(err);
            }
            resolve('ok');
        });
    });
}
exports.saveFile = saveFile;
/**
 * 输出国际化词条key文件
 * @param path 文件路径
 * @param keys 词条数组
 */
async function saveKeys(path, keys) {
    const content = JSON.stringify(keys)
        .replace(/^\[/, '\[\n  ')
        .replace(/,/g, ',\n  ')
        .replace(/\]$/, '\n\]');
    await saveFile(path, content);
}
exports.saveKeys = saveKeys;
/**
 * 输出国际化翻译文件
 * @param path 文件路径
 * @param keys 翻译对象key-value
 */
async function saveMaps(path, keys) {
    const content = JSON.stringify(keys)
        .replace(/,/g, ',\n  ')
        .replace(/:/g, ': ')
        .replace(/^{/, '{\n  ')
        .replace(/}$/, '\n}');
    await saveFile(path, content);
}
exports.saveMaps = saveMaps;
function deduplicationSortKeys(keys) {
    return Array.from(new Set(keys)).sort((a, b) => b > a ? 1 : -1);
}
exports.deduplicationSortKeys = deduplicationSortKeys;
function keepDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
exports.keepDir = keepDir;
function existsSync(dir) {
    return fs.existsSync(dir);
}
exports.existsSync = existsSync;
