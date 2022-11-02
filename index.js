const core = require('@actions/core');
const axios = require('axios');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const access_token = core.getInput('access_token', { required: true });
        const msgtype = core.getInput('msgtype');
        const content = core.getInput('content', { required: true });
        const at = core.getInput('at');

        const contentJson = JSON.parse(content);
        const atJson = at ? JSON.parse(at) : {};

        const payload = {
            msgtype,
            [msgtype]: contentJson,
            atJson
        };

        const ret = await axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${access_token}`, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('response:', ret.data);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
