"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const lib_1 = require("./lib");
// ts-expect-error
// import { version } from '../package.json'
const version = '0.1.0';
const cli = (0, cac_1.cac)('i18n');
cli
    .command('extract', 'extract lang keys')
    .option('--in <string>', 'Set envs')
    .option('--out <dir>', 'Set envs')
    .option('--verbose', 'display verbose log')
    // .example('--env.API_SECRET xxx')
    .action((options) => {
    if (options.verbose) {
        console.log('cli options=', options, lib_1.extract);
    }
    (0, lib_1.extract)({
        in: `${options.in}/**/*.{ts{,x},js{,x},vue}`,
        out: options.out,
        verbose: options.verbose,
    });
});
cli
    .command('release', 'extract lang keys')
    .option('--in <string>', 'Set envs')
    .option('--out <dir>', 'Set envs')
    .option('--verbose', 'display verbose log')
    // .example('--env.API_SECRET xxx')
    .action((options) => {
    if (options.verbose) {
        console.log('cli options=', options, lib_1.extract);
    }
    (0, lib_1.release)({
        in: options.in,
        out: options.out,
        verbose: options.verbose,
        langs: ['zh-hk', 'en-us'],
        default: 'zh-hk',
    });
});
cli.help();
cli.version(version);
cli.parse();
