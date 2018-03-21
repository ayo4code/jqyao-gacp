/**
 * @since 2018-03-21 14:40
 * @author jq.yao
 */
require('babel-polyfill');
const git = require('../git/index');
const prompt = require('./prompt');

module.exports = async () => {
    const message = await prompt()
    await git(message);
};
