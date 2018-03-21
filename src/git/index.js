/**
 * @since 2018-03-21 14:40
 * @author jq.yao
 */
const execa = require('execa');
const Listr = require('listr');

const isRepositoryExsits = require('./status/isRepositoryExsits');
const isWorkspaceClean = require('./status/isWorkspaceClean');
const remoteStatus = require('./status/remoteStatus');


const ga = async () => {
    return execa('git', ['add', '.']);
};
const gcmsg = async (message) => {
    return execa('git', ['commit', '-m', message]);
};
const ggpush = async () => {
    return execa('git', ['push']);
};

const getTasks = (message) => {
    return new Listr([
        {
            title: 'git add',
            task: ga,
        },
        {
            title: 'git commit',
            task: gcmsg.bind(this, message),
        },
        {
            title: 'git push',
            task: ggpush,
        }
    ]);
}

module.exports = async (message) => {
    try {
        //检测是仓库是否存在
        const _isRepositoryExsits = await isRepositoryExsits();
        if (!_isRepositoryExsits) {
            console.log('git init??');
            process.exit(1);
        }
        //检测仓库是否有更新
        const _isWorkspaceClean = await isWorkspaceClean();
        if (!_isWorkspaceClean) {
            console.log('workspace clean!!!');
            process.exit(1);
        }
        //检测是否绑定远程仓库
        const _hasRemoteRepository = await remoteStatus();
        if (!_hasRemoteRepository) {
            console.log('未关联远程仓库!!!');
            process.exit(1);
        }
        await getTasks(message).run();

    } catch (err) {
        console.log('未知错误');
        process.exit(1);
    } finally {
        console.log('ok');
        process.exit(0);
    }
};

