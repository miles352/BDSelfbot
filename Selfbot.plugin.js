/**
 * @name Selfbot
 * @author jefff#0999
 * @description Discord selfbot built with a betterdiscord plugin
 * @version 0.0.1
 * @invite soon maybe
 * @authorId 769415977439592468
 * @website https://jefff.dev
 */


// module.exports = class Selfbot {
//
//   load() {
//
//
//   }
//
//   start() {
//     // for auto update
//     //if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing", `The library plugin needed for this plugin is missing. Go download it here: https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js`);
//     //ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "LINK_TO_RAW_CODE");
//
//     // Insert all commands and "modules"/sections
//     modules.forEach(module => {
//       SectionModule.push({
//         id: `-${SectionModule.length + 1}`,
//         name: module.name,
//         type: 0
//       })
//       module.commands.forEach(command => {
//         CommandsModule.push({
//           id: `-${CommandsModule.length + 1}`,
//           applicationId: `-${SectionModule.length}`,
//           type: 0,
//           name: command.name,
//           description: command.description,
//           options: command.options,
//           execute: command.execute
//         })
//       })
//     })
//
//   }
//   stop() {
//     CommandsModule.length = 8;
//     SectionModule.length = 1;
//     // // Unsubscribe.
//     FluxDispatcher.unsubscribe("MESSAGE_CREATE", () => {});
//   }
//   //user subscribe for message logger
//
//
//
// }

const Selfbot = (() => {

  let config = {
    "main": "index.js",
    "info": {
      "name": "Selfbot",
      "authors": [{
        "name": "jefff",
        "discord_id": "769415977439592468"
    }],
      "version": "1.0.1",
      "description": "Custom slash commands and an advanced dank memer farmer bot.",
      "github": "",
      "github_raw": ""
    },
    "changelog": [{
        "title": "New Stuff",
        "items": ["Added settings", "Added changelog"]
  }, /*{*/
      // "title": "Bugs Squashed",
      // "type": "fixed",
      // "items": ["React errors on reload"]
  /*},*/
      {
        "title": "Improvements",
        "type": "improved",
        "items": ["Now supports almost all currency commands"]
  }, {
        "title": "On-going",
        "type": "progress",
        "items": ["Pls work coming soon", "Pls trivia getting the answers correct coming soon"]
  }],
    "defaultConfig": [{
      "type": "textbox",
      "id": "token",
      "name": "token",
      "note": "",
      "value": "",
      "placeholder": "Token goes here..."
  }, {
      "type": "category",
      "id": "dankmemer",
      "name": "Dank Memer Settings",
      "collapsible": true,
      "shown": false,
      "settings": [{
        "type": "switch",
        "id": "deposit",
        "name": "pls deposit max",
        "note": "This is recommended to stay on, as you might die and lose all your coins if it's off",
        "value": true
      }, {
        "type": "switch",
        "id": "beg",
        "name": "pls beg",
        "note": "Whether the bot uses pls beg or not",
        "value": true
    }, {
        "type": "switch",
        "id": "search",
        "name": "pls search",
        "note": "Whether the bot uses pls search or not",
        "value": true
    }, {
        "type": "switch",
        "id": "fish",
        "name": "pls fish",
        "note": "Whether the bot uses pls fish or not",
        "value": true
    }, {
        "type": "switch",
        "id": "hunt",
        "name": "pls hunt",
        "note": "Whether the bot uses pls hunt or not",
        "value": true
    }, {
        "type": "switch",
        "id": "postmemes",
        "name": "pls postmemes",
        "note": "Whether the bot uses pls postmemes or not",
        "value": true
    }, {
        "type": "switch",
        "id": "highlow",
        "name": "pls highlow",
        "note": "Whether the bot uses pls highlow or not",
        "value": true
    }, {
        "type": "switch",
        "id": "trivia",
        "name": "pls trivia",
        "note": "Whether the bot uses pls trivia or not",
        "value": true
    }, {
        "type": "switch",
        "id": "gamble",
        "name": "pls gamble",
        "note": "Whether the bot uses pls gamble or not",
        "value": true
    }, {
        "type": "switch",
        "id": "snakeeyes",
        "name": "pls snakeeyes",
        "note": "Whether the bot uses pls snakeeyes or not",
        "value": true
    }, {
        "type": "switch",
        "id": "slots",
        "name": "pls slots",
        "note": "Whether the bot uses pls slots or not",
        "value": true
    }, {
        "type": "switch",
        "id": "blackjack",
        "name": "pls blackjack",
        "note": "Whether the bot uses pls blackjack or not",
        "value": true
    }]
  }, {
      "type": "category",
      "id": "other",
      "name": "Other Settings",
      "collapsible": true,
      "shown": false,
      "settings": [{
        "type": "textbox",
        "id": "embedColor",
        "name": "Embed Color",
        "note": "This must be in decimal format, you can use https://www.rapidtables.com/convert/number/hex-to-decimal.html to get the right color",
        "value": "16760389",
        "placeholder": ""
  }]
  }]
  }

  return !global.ZeresPluginLibrary ? class {
    constructor() { this._config = config; }
    getName() { return config.info.name; }
    getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
    getDescription() { return config.info.description; }
    getVersion() { return config.info.version; }
    load() {
      BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
        confirmText: "Download Now",
        cancelText: "Cancel",
        onConfirm: () => {
          require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
            await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
          });
        }
      });
    }
    start() {}
    stop() {}
  } : (([Plugin, Api]) => {
    const plugin = (Plugin, Library) => {

      const { Logger, Patcher } = Library;

      const SectionModule = BdApi.findModuleByProps("BUILT_IN_SECTIONS").BUILT_IN_SECTIONS;
      const CommandsModule = BdApi.findModuleByProps("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;
      const SendClyde = BdApi.findModuleByProps("sendMessage").sendBotMessage;
      const EditMessage = BdApi.findModuleByProps("sendMessage").editMessage;
      const DeleteMessage = BdApi.findModuleByProps("sendMessage").deleteMessage;
      const FluxDispatcher = BdApi.findModuleByProps("subscribe");
      return class Selfbot extends Plugin {

        onStart() {

          ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/miles352/BDSelfbot/main/Selfbot.plugin.js");
          // load settings
          const catApiKey = "ea42f3a5-746d-417f-be9f-1313c6b452f5";

          let catIds = {};
          (async () => {
            const data = await fetch(`https://api.thecatapi.com/v1/breeds`, {
              headers: {
                "x-api-key": catApiKey
              }
            }).then(res => res.json());
            data.forEach(cat => {
              Object.defineProperty(catIds, `${cat.name.toLowerCase()}`, { value: cat.id })
            })
          })();

          function wait(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
          }

          const SendClydeEmbed = (channel_id, embed) => {
            if (!embed.footer) {
              embed.footer = {
                text: "Jefff-Cord",
                icon_url: "https://cdn.discordapp.com/avatars/769415977439592468/41377a891a8c762d9dd40bcbdd8ffd5d.webp"
              }
            }
            if (!embed.color) {
              embed.color = this.settings.other.embedColor;
            }
            if (embed.timestamp) {
              delete embed.timestamp;
            } else {
              embed.timestamp = new Date().toISOString();
            }
            SendClyde(channel_id, "", [embed]);
          }
          //SendMessage(t.channel.id, { content: "", nonce: Date.now() * (2 * 22), validNonShortcutEmojis: [] })
          const SendMessage = (channel_id, msgContent) => {
            BdApi.findModuleByProps("sendMessage").sendMessage(channel_id, { content: msgContent, nonce: Date.now() * (2 * 22), validNonShortcutEmojis: [] })
          }

          const SendClydeError = (channel_id, errorMsg) => {
            const embed = {
              title: "Error!!",
              description: errorMsg.toString(),
              color: 15077392,
              type: "rich",
              thumbnail: {
                url: "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png",
                height: 100,
                width: 100
              }
            }
            SendClydeEmbed(channel_id, embed);
          }

          const SendEmbed = async (channel_id, embed) => {
            if (!embed.footer) {
              embed.footer = {
                text: "Jefff-Cord",
                icon_url: "https://cdn.discordapp.com/avatars/769415977439592468/41377a891a8c762d9dd40bcbdd8ffd5d.webp"
              }
            }
            if (!embed.color) {
              embed.color = this.settings.other.embedColor;
            }
            if (embed.timestamp) {
              delete embed.timestamp;
            } else {
              embed.timestamp = new Date().toISOString();
            }
            const data = await fetch(`https://discord.com/api/v8/channels/${channel_id}/messages`, {
              headers: {
                authorization: this.settings.token,
                "Content-Type": 'application/json'
              },
              method: "POST",
              body: JSON.stringify({ embed })
            }).then(res => res.json());
          }



          const modules = [
            {
              name: "Utility",
              icon: {
                path: `M4.68,13.716v-0.169H4.554C4.592,13.605,4.639,13.658,4.68,13.716z M11.931,6.465
                    	 c-0.307-0.087-0.623,0.106-0.706,0.432l-1.389,5.484c-0.901,0.084-1.609,0.833-1.609,1.757c0,0.979,0.793,1.773,1.773,1.773
                     	 c0.979,0,1.773-0.794,1.773-1.773c0-0.624-0.324-1.171-0.812-1.486l1.377-5.439C12.422,6.887,12.239,6.552,11.931,6.465z
                     	 M10.591,14.729H9.408v-1.182h1.183V14.729z M15.32,13.716c0.04-0.058,0.087-0.11,0.126-0.169H15.32V13.716z M10,3.497
                    	 c-3.592,0-6.503,2.911-6.503,6.503H4.68c0-2.938,2.382-5.32,5.32-5.32s5.32,2.382,5.32,5.32h1.182
                    	 C16.502,6.408,13.591,3.497,10,3.497z M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.224,4.234,9.458,9.458,9.458
                     	 c5.224,0,9.458-4.234,9.458-9.458C19.458,4.776,15.224,0.542,10,0.542z M15.32,16.335v0.167h-0.212
                    	 c-1.407,1.107-3.179,1.773-5.108,1.773c-1.93,0-3.701-0.666-5.108-1.773H4.68v-0.167C2.874,14.816,1.724,12.543,1.724,10
                    	 c0-4.571,3.706-8.276,8.276-8.276c4.57,0,8.275,3.706,8.275,8.276C18.275,12.543,17.126,14.816,15.32,16.335z`,
                height: 28,
                width: 28,
                viewBox: "-0.5 -1 24 24"
              },
              commands: [
                {
                  name: "userinfo",
                  description: "Displays user info.",
                  options: [{ name: "id", type: 4, description: "User ID", required: true }],
                  execute: async function(e, t) {
                    try {
                      const data = await fetch(`https://discord.com/api/v8/guilds/${t.guild.id}/members/${e.id[0].text}`, {
                        headers: {
                          authorization: this.settings.token
                        }
                      }).then(res => {
                        if (res.status = 400) {
                          throw "Invalid user ID"
                        }
                        return res.json()
                      });

                      SendClydeEmbed(t.channel.id, {
                        title: `Information for User: ${data.user.username}`,
                        type: "rich",
                        thumbnail: {
                          url: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}`,
                          height: 128,
                          width: 128
                        },
                        fields: [
                          {
                            name: "Username",
                            value: `${data.user.username}#${data.user.discriminator}`
                          },
                          {
                            name: "ID",
                            value: data.user.id
                          },
                          {
                            name: "Server Join Date",
                            value: `${data.joined_at.slice(5, 10)}-${data.joined_at.slice(0,4)}`
                          }
                        ]
                      });
                    } catch (e) {
                      SendClydeError(t.channel.id, e);
                    }
                  },
                 },
                {
                  name: "base64",
                  description: "Encodes/Decodes Base64.",
                  options: [{
                      type: 3,
                      name: "encode/decode",
                      description: "If you want to encode or decode your base64",
                      required: true,
                      choices: [{ name: "encode", value: "encode" }, { name: "decode", value: "decode" }]
                   },
                    {
                      type: 3,
                      name: "text",
                      description: "The text to either encode or decode",
                      required: true,
                   }],
                  execute: function(e, t) {
                    try {
                      let translatedText;
                      switch (e['encode/decode'][0].text) {
                        case "encode":
                          translatedText = Buffer.from(e.text[0].text).toString('base64');
                          break;
                        case "decode":
                          translatedText = Buffer.from(e.text[0].text, 'base64').toString();
                          break;
                      }
                      const embed = {
                        title: "Base64 Encoder/Decoder",
                        thumbnail: {
                          url: "https://pxl.fm/i/images/2019/02/06/9879_hackerman.gif",
                          height: 200,
                          width: 200
                        },
                        type: "rich",
                        fields: [{
                            name: "Input",
                            value: e.text[0].text
                        },
                          {
                            name: "Output",
                            value: translatedText
                      }]
                      }
                      SendClydeEmbed(t.channel.id, embed);
                    } catch (err) {
                      SendClydeError(t.channel.id, err)
                    }
                  }
                 }
               ]
             },
            {
              name: "Fun",
              icon: {
                path: `M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-12c.331 1.465 2.827 4 6.001 4 3.134 0 5.666-2.521 5.999-4zm0-3.998l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002zm-7 0l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002z`,
                height: 24,
                width: 24,
                viewBox: "0 0 24 24"
              },
              commands: [
                {
                  name: "cat",
                  description: "Sends an image of a cat.",
                  options: [{ type: 3, name: "breed", description: "Kind of cat breed to display.", required: false }],
                  execute: async function(e, t) {
                    try {
                      let breed = "";
                      if (e.breed) {
                        if (Object.getOwnPropertyNames(catIds).includes(e.breed[0].text.toLowerCase())) {
                          breed = catIds[e.breed[0].text.toLowerCase()];
                        } else {
                          throw "Invalid cat breed. You can find a list of valid breeds here: placetofindstuff"
                        }
                      }
                      const data = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, {
                        headers: {
                          "x-api-key": catApiKey
                        }
                      }).then(res => res.json());
                      SendEmbed(t.channel.id, {
                        title: "Enjoy a cat!",
                        image: {
                          url: data[0].url,
                          height: data[0].height,
                          width: data[0].width
                        },
                        type: "rich",
                      })
                    } catch (e) {
                      SendClydeError(t.channel.id, e)
                    }
                  }
                 },
                {
                  name: "say",
                  description: "Sends a message as Clyde that only you can see.",
                  options: [{ name: "message", type: 3, description: "Message content", required: true }],
                  execute: function(e, t) {
                    SendClyde(t.channel.id, e.message[0].text);
                  },
                 },
                // {
                //   name: "911",
                //   description: "Sends a short 9/11 animation.",
                //   options: [],
                //   execute: async function(e, t) {
                //     try {
                //       let messageId;
                //       SendMessage(t.channel.id, ":airplane:                                                                         :office:").then(res => messageId = res.body.id)
                //       await wait(500);
                //       EditMessage(t.channel.id, messageId, { content: ":airplane:                                                      :office:", nonce: Date.now() * (2 * 22) })
                //       await wait(500);
                //       EditMessage(t.channel.id, messageId, { content: ":airplane:                                      :office:", nonce: Date.now() * (2 * 22) })
                //       await wait(500);
                //       EditMessage(t.channel.id, messageId, { content: ":airplane:                      :office:", nonce: Date.now() * (2 * 22) })
                //       await wait(500);
                //       EditMessage(t.channel.id, messageId, { content: ":airplane:          :office:", nonce: Date.now() * (2 * 22) })
                //       await wait(500);
                //       EditMessage(t.channel.id, messageId, { content: ":boom::boom:", nonce: Date.now() * (2 * 22) })
                //       await wait(2000);
                //       DeleteMessage(t.channel.id, messageId);
                //     } catch (err) {
                //       SendClydeError(t.channel.id, err);
                //     }
                //   }
                // },
                {
                  name: "bubblewrap",
                  description: "Sends bubblewrap for you to pop.",
                  options: [],
                  execute: function(e, t) {
                    SendMessage(t.channel.id, `
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||
          ||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||||     ||`)
                  }
                },
                {
                  name: "8ball",
                  description: "Asks the 8ball a question.",
                  options: [{ type: 3, name: "question", description: "The question to ask the 8ball", required: true }],
                  execute: async function(e, t) {
                    try {
                      const data = await fetch(`https://8ball.delegator.com/magic/JSON/${e.question[0].text}`)
                        .then(res => res.json())
                      let embedColor;
                      switch (data.magic.type) {
                        case "Affirmative":
                          embedColor = 719434;
                          break;
                        case "Neutral":
                          embedColor = 14606046;
                          break;
                        case "Contrary":
                          embedColor = 15077392;
                          break;
                      }
                      const embed = {
                        title: "The 8ball Says...",
                        type: "rich",
                        thumbnail: {
                          url: "https://magic-8ball.com/assets/images/magicBallStart.png"
                        },
                        color: embedColor,
                        fields: [{
                            name: "Question:",
                            value: data.magic.question,
                            inline: true
                        },
                          {
                            name: "Answer:",
                            value: data.magic.answer,
                            inline: true
                      }]
                      }
                      SendEmbed(t.channel.id, embed);
                    } catch (err) {
                      SendClydeError(t.channel.id, err);
                    }
                  }
                },
                {
                  name: "clearchat",
                  description: "Sends a giant blank message.",
                  options: [],
                  execute: function(e, t) {
                    let bigmessage = "_"
                    for (var i = 0; i < 1998; i++) {
                      bigmessage += "\n";
                    }
                    bigmessage += "_";
                    SendMessage(t.channel.id, bigmessage);
                  }
                },
                {
                  name: "farmcoins",
                  description: "Farms dank memer coins/levels for you.",
                  options: [],
                  execute: async function(e, t) {

                    const formatter = new Intl.NumberFormat();

                    function average(nums) {
                      return nums.reduce((a, b) => (a + b)) / nums.length;
                    }

                    const botId = "270904126974590976";
                    const myId = "769415977439592468";

                    const topbar = document.getElementsByClassName("typeWindows-1za-n7 withFrame-haYltI titleBar-AC4pGV horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 da-typeWindows da-withFrame da-titleBar da-horizontalReverse da-flex da-directionRowReverse da-justifyStart da-alignStretch")[0];
                    const discordlogo = document.getElementsByClassName("wordmarkWindows-1v0lYD wordmark-2iDDfm da-wordmarkWindows da-wordmark")[0];

                    let style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = `
                      .memerinfo {
                        position: absolute;
                        top: 0.52vh;
                        left: 7vw;
                        color: var(--text-muted);
                        font-weight: bold;
                        font-size: 13px;
                      }
                      .memerinfo > * {
                        margin-right: 10px;
                        display: inline-block;
                      }
                    `;
                    document.getElementsByTagName('head')[0].appendChild(style);

                    const memerinfo = document.createElement("div");
                    memerinfo.className = "memerinfo";

                    const amountDepositedElement = document.createElement("h1");
                    memerinfo.appendChild(amountDepositedElement);

                    const totalMoneyElement = document.createElement("h1");
                    memerinfo.appendChild(totalMoneyElement);

                    topbar.append(memerinfo);

                    let amountsDeposited = [];

                    async function messageSent(...args) {
                      try {
                        const content = args[0].message.content;
                        if (args[0].channelId == t.channel.id && args[0].message.author.id == botId && args[0].message.mentions[0].id == myId) {
                          if (content.includes("Where do you want to search")) {
                            const thingToSearch = content.substring(content.lastIndexOf(",") + 3, content.lastIndexOf("`"));
                            SendMessage(t.channel.id, thingToSearch);
                          } else if (content.includes("What type of meme do you want to post")) {
                            SendMessage(t.channel.id, "k");
                          } else if (content.includes("ITS A DRAGON")) {
                            const dragonWord = content.substring(content.lastIndexOf("Type ") + 6, content.lastIndexOf("`")).replace(/﻿/g, "");
                            SendMessage(t.channel.id, dragonWord);
                          } else if (content.includes("fish is too strong")) {
                            const fishWord = content.substring(content.lastIndexOf("Type ") + 6, content.lastIndexOf("`")).replace(/﻿/g, "");
                            SendMessage(t.channel.id, fishWord);
                          } else if (content.includes("deposited, current bank balance is")) {
                            const amountDeposited = content.substring(content.indexOf("⏣") + 2, content.indexOf("deposited") - 3).replace(/,/g, "");
                            amountsDeposited.push(parseInt(amountDeposited));
                            const averageAmountDeposited = average(amountsDeposited);
                            // calculate ratio from 50-60 seconds
                            const perMinute = 60 * (averageAmountDeposited / 50);

                            amountDepositedElement.innerText = `Average ⏣/minute: ⏣ ${formatter.format(perMinute)}`;

                            const totalMoney = content.substring(content.lastIndexOf("⏣") + 2, content.indexOf(".") - 2).replace(/,/g, "");
                            totalMoneyElement.innerText = `Total Money: ⏣ ${formatter.format(totalMoney)}`;
                          }
                        }
                      } catch {

                      }

                    }
                    // Subscribe.
                    FluxDispatcher.subscribe("MESSAGE_CREATE", messageSent);


                    while (true) {
                      SendMessage(t.channel.id, "pls fish");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls hunt");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls beg");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls postmemes");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls search");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls hl");
                      await wait(2000);
                      SendMessage(t.channel.id, ["high", "low", "jackpot"][Math.floor(Math.random() * 3)]);
                      await wait(4000);
                      SendMessage(t.channel.id, "pls trivia");
                      await wait(2000);
                      SendMessage(t.channel.id, ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]);
                      await wait(4000);
                      SendMessage(t.channel.id, "pls gamble 10");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls snakeeyes 10");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls slots 10");
                      await wait(4000);
                      SendMessage(t.channel.id, "pls bj 10");
                      await wait(2000);
                      SendMessage(t.channel.id, "s");
                      await wait(2000);
                      SendMessage(t.channel.id, "pls dep max");
                      await wait(2000);
                    }
                  }
                    }
                  ]
                },
            {
              name: "Backup",
              icon: {
                path: `M17.927,5.828h-4.41l-1.929-1.961c-0.078-0.079-0.186-0.125-0.297-0.125H4.159c-0.229,0-0.417,0.188-0.417,0.417v1.669H2.073c-0.229,0-0.417,0.188-0.417,0.417v9.596c0,0.229,0.188,0.417,0.417,0.417h15.854c0.229,0,0.417-0.188,0.417-0.417V6.245C18.344,6.016,18.156,5.828,17.927,5.828 M4.577,4.577h6.539l1.231,1.251h-7.77V4.577z M17.51,15.424H2.491V6.663H17.51V15.424z`,
                height: 24,
                width: 24,
                viewBox: "0 0 20 20"
              },
              commands: [
                // {
                //   name: "getEmojis",
                //   description: "Saves all the emojis from a server to a folder.",
                //   options: [{name: "server id", type: 4, description: "The server to get emojis from, default is current one", required: false}],
                //   execute: function(e, t) {
                //
                //   }
                // },
                {
                  name: "backupserverinvites",
                  description: "Saves invites to all your servers to a file.",
                  options: [],
                  execute: async function(e, t) {
                    const userGuilds = await fetch(`https://discord.com/api/v8/users/@me/guilds`, {
                      headers: {
                        authorization: this.settings.token,
                      }
                    }).then(res => res.json())
                    // console.log(userGuilds);
                    for (var i = 0; i < userGuilds.length; i++) {
                      try {
                        if (userGuilds[i].features.includes("VANITY_URL")) {
                          throw `Server: ${userGuilds[i].name} | Vanity URLS are not currently supported.`;
                        }
                        const guildName = userGuilds[i].name;
                        const guildIcon = `https://cdn.discordapp.com/icons/${userGuilds[i].id}/${userGuilds[i].icon}.webp?size=128`;
                        await wait(1000);
                        const channels = await fetch(`https://discord.com/api/v8/guilds/${userGuilds[i].id}/channels`, {
                          headers: {
                            authorization: this.settings.token
                          }
                        }).then(res => res.json()).catch(err => SendClydeError(t.channel.id, err));
                        // console.log(channels);
                        let channelId = undefined;
                        channels.forEach(channel => {
                          if (channel.type == 0 && channelId === undefined) {
                            let havePermission = true;
                            channel.permission_overwrites.forEach(permission => {
                              // if DONT have permission to invite
                              if ((permission.deny & 0x1) == 0x1) {
                                havePermission = false;
                              }
                            })
                            if (havePermission) {
                              channelId = channel.id;
                            }
                          }
                        })
                        if (channelId === undefined) {
                          throw `No permissions to create invite in server \`${userGuilds[i].name}\``;
                        }

                        await wait(5000);
                        BdApi.findModuleByProps("createInvite").createInvite(channelId, { max_age: 0 })
                          .then(res => {
                            console.log(`Created invite code: "${res.code}", in server ${guildName}, which has icon ${guildIcon}`);
                          })
                        // .catch(err => {
                        //   console.log(`Server: ${guildName}. Channel: ${logchannel.name}`);
                        // })


                      } catch (e) {
                        SendClydeError(t.channel.id, e);
                      }
                    }
                  }
                    }
                  ]
                }
              ]

          // Insert all commands and "modules"/sections
          modules.forEach(module => {
            SectionModule.push({
              id: `-${SectionModule.length + 1}`,
              name: module.name,
              type: 0
            })
            module.commands.forEach(command => {
              CommandsModule.push({
                id: `-${CommandsModule.length + 1}`,
                applicationId: `-${SectionModule.length}`,
                type: 0,
                name: command.name,
                description: command.description,
                options: command.options,
                execute: command.execute
              })
            })
          })
          Logger.log("Started");
          Patcher.before(Logger, "log", (t, a) => {
            a[0] = "Patched Message: " + a[0];
          });
        }

        onStop() {
          Logger.log("Stopped");
          Patcher.unpatchAll();
          CommandsModule.length = 8;
          SectionModule.length = 1;
          // // Unsubscribe.
          FluxDispatcher.unsubscribe("MESSAGE_CREATE", () => {});
        }

        getSettingsPanel() {
          const panel = this.buildSettingsPanel();
          // document.querySelector(".da-flex > button.bd-button").addEventListener("click", async () => {
          //   const data = await fetch(`https://discord.com/api/v8/users/@me`, {
          //     headers: {
          //       authorization: this.settings.token,
          //       "Content-Type": 'application/json'
          //     },
          //     method: "GET"
          //   }).then(res => res.json());
          //   console.log(data);
          // })
          return panel.getElement();
        }
      };

    };
    return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();