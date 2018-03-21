/**
 * @since 2018-03-21 14:40
 * @author jq.yao
 */
const inquirer = require('inquirer');
const gitmojis = require('../config/gitmojis.json').gitmojis;

const gitmojiList = gitmojis.map(gitmoji => {
    return {
        name: `${gitmoji.emoji}-${gitmoji.description}`,
        value: gitmoji.code
    }
});
gitmojiList.unshift({ name: '无', value: '' });

module.exports = async () => {
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: "Select the type of change that you\'re committing:",
            choices: gitmojiList
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Write a short, imperative tense description of the change:\n'
        },
    ]
    const answers = await inquirer.prompt(questions);
    return answers.type + answers.subject
}