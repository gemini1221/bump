const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

const BOT_ID = '302050872383242240'; // ここにBOTのIDを入力してください
const CHANNEL_ID = '1264844591073333281'; // ここにチャンネルIDを入力してください
const COMMAND_NAME = 'bump'; // ここにコマンド名を入力してください


process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setTimeout(() => {
    loop();
  }, 5000); // 5秒待ってからloopを開始
});

async function slashCommand() {
  try {
    console.log('Attempting to fetch channel...');
    const channel = await client.channels.fetch(CHANNEL_ID);
    if (!channel) {
      throw new Error('Channel not found');
    }
    console.log('Channel fetched successfully. Attempting to send slash command...');
    await channel.sendSlash(BOT_ID, COMMAND_NAME);
    console.log('Slash command sent successfully!');
  } catch (error) {
    console.error('Error in slashCommand:', error);
    console.log('Retrying in 5 seconds...');
    setTimeout(async () => {
      await slashCommand();
    }, 5000); // 5秒後に再試行
  }
}

function loop() {
  setTimeout(async function () {
    console.log('Executing slash command...');
    await slashCommand();
    console.log('Slash command execution completed. Scheduling next execution...');
    loop();
  }, 7200 * 1000); // 2時間ごとに実行
}

// 初回の実行をテストするために、readyイベント後に直接slashCommandを呼び出す
client.on('ready', async () => {
  console.log('Bot is ready. Testing initial slash command execution...');
  await slashCommand();
  console.log('Initial test completed. Starting regular loop...');
  loop();
});

client.login('process.env.token'); 
