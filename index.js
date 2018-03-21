#!/usr/bin/env node
const main = require('./src/command');

const initYargsConfig = () => {
    return require('yargs')
        .version()
        .help()
        .argv;
};

initYargsConfig();
main();

