const Telegraf = require('telegraf');

const bot = new Telegraf('1127895907:AAGugeyIqWLiO_nbMxBfAqmJrlOXEugrvJw');

// bot.command('test', (ctx) => {
//    // bot.telegram.sendPhoto(ctx.chat.id, 'url');... using url
//    // using file path.
//    //    bot.telegram.sendPhoto(ctx.chat.id, { source: 'res/dubai.jpg' });
//    //    bot.telegram.sendPhoto(ctx.chat.id, 'this is stored as an array in ctx.message.photo ');
// });

bot.command(['start', 'help'], (ctx) => {
   const message = `
   HElP REFERENCE.
   /newyork - get image 
   /dubai - get GIF
   /singapore - location 
   /cities - get album
   /citiesList - get list
   `;
   ctx.reply(message);
});

bot.command('newyork', (ctx) => {
   bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo');

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

bot.command('dubai', (ctx) => {
   bot.telegram.sendChatAction(ctx.chat.id, 'upload_video');

   bot.telegram.sendAnimation(
      ctx.chat.id,
      'https://tenor.com/view/city-lights-gif-9435277',
      {
         reply_to_message_id: ctx.message.message_id,
      }
   );
});

bot.command('cities', (ctx) => {
   let cities = [
      'res/dubai.jpg',
      'res/hongkong.jpg',
      'res/london.jpg',
      'res/newyork.jpg',
      'res/singapore.jpg',
   ];

   let result = cities.map((city) => {
      return {
         type: 'photo',
         media: { source: city },
      };
   });

   bot.telegram.sendMediaGroup(ctx.chat.id, result);
});

bot.command('citiesList', (ctx) => {
   bot.telegram.sendDocument(
      ctx.chat.id,
      {
         source: 'res/citieslist.txt',
      },
      {
         thumb: { source: 'res/dubai.jpg' },
      }
   );
});

bot.command('singapore', (ctx) => {
   bot.telegram.sendPhoto(ctx.chat.id, {
      source: 'res/singapore.jpg',
   });
   let lat = 1.3521;
   let long = 103.8198;
   bot.telegram.sendLocation(ctx.chat.id, lat, long);
});

bot.on('message', async (ctx) => {
   try {
      if (ctx.updateSubTypes[0] === 'document') {
         let link = await bot.telegram.getFileLink(
            ctx.message.document.file_id
         );
         ctx.reply('your download link: ' + link);
      }
   } catch (err) {
      ctx.reply(err.description);
   }
});

bot.launch();
