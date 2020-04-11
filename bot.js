const Telegraf = require('telegraf');

const bot = new Telegraf('1127895907:AAGugeyIqWLiO_nbMxBfAqmJrlOXEugrvJw');

// bot.command('test', (ctx) => {
//    // bot.telegram.sendPhoto(ctx.chat.id, url(''));... using url
//    // using file path.
//    //    bot.telegram.sendPhoto(ctx.chat.id, { source: 'res/dubai.jpg' });
//    //    bot.telegram.sendPhoto(ctx.chat.id, 'this is stored as an array in ctx.message.photo ');
// });

bot.command('newyork', (ctx) => {
   bot.telegram.sendPhoto(
      ctx.chat.id,
      {
         source: 'res/newyork.jpg',
      },
      {
         reply_to_message_id: ctx.message.message_id,
      }
   );
});

bot.launch();
