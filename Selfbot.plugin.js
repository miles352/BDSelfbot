/**
 * @name Selfbot
 * @author jefff#0999
 * @description Discord selfbot built with a betterdiscord plugin
 * @version 1.1.3
 * @invite m7HRTw8x48
 * @authorId 769415977439592468
 * @website https://jefff.dev
 */

const { Buffer } = require("buffer");
const fs = require('fs')

const Selfbot = (() => {

  let config = {
    "main": "index.js",
    "info": {
      "name": "Selfbot",
      "authors": [{
        "name": "jefff",
        "discord_id": "769415977439592468"
    }],
      "version": "1.4.3",
      "description": "Custom slash commands and an advanced dank memer farmer bot.",
      "github": "",
      "github_raw": "https://raw.githubusercontent.com/miles352/BDSelfbot/main/Selfbot.plugin.js"
    },
    "changelog": [
      {
        "title": "New Stuff",
        "items": ["You can now do \"/rule34 help\" to see how to use tags."]
        },

      /*{
        "title": "Bugs Squashed",
        "type": "fixed",
        "items": ["Hopefully fixes bug with status not showing"]
        },
            */
      /*{
        "title": "Improvements",
        "type": "improved",
        "items": ["You can load your backed up servers now"]
            }
            /*, {
                          "title": "On-going",
                          "type": "progress",
                          "items": ["Pls work coming soon", "Pls trivia getting the answers correct coming soon"]
                    }*/
          ],
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
      "id": "advancedMemer",
      "name": "Advanced Dank Memer Settings",
      "collapsible": true,
      "shown": false,
      "settings": [{
        "type": "radio",
        "id": "searchPreference",
        "name": "pls search customization",
        "value": "random",
        "options": [{
          "name": "Safe",
          "value": "safe",
          "desc": "The safest option, lesser profit",
          "color": "#39c926"
        }, {
          "name": "Random",
          "value": "random",
          "desc": "Completely random, this is the default",
          "color": "#d1d1d1"
        }, {
          "name": "Dangerous",
          "value": "dangerous",
          "desc": "Most profit but more dangerous",
          "color": "#c91818"
        }]
      }, {
        "type": "switch",
        "id": "status",
        "name": "Topbar Status",
        "note": "Whether or not the top bar with the coins/minute and total coins counter is there",
        "value": true
      }, {
        "type": "color",
        "id": "color",
        "name": "The color of the status",
        "note": "",
        "value": "#72767d"
      }, {
        "type": "slider",
        "id": "viewheight",
        "name": "Viewheight of the status",
        "note": "This is in relation to the top of the window",
        "value": 0.52,
        "min": 0,
        "max": 100
    }, {
        "type": "slider",
        "id": "viewwidth",
        "name": "Viewwidth of the status",
        "note": "This is in relation to the left of the window",
        "value": 7,
        "min": 0,
        "max": 100
    }]
  }, {
      "type": "category",
      "id": "other",
      "name": "Other Settings",
      "collapsible": true,
      "shown": false,
      "settings": [{
        "type": "color",
        "id": "embedColor",
        "name": "Embed Color",
        "note": "This applies to commands such as /cat",
        "value": "#fcba03"
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
      const ttsApiKey = "449a08838f01456cb7e53d3cbb0794b0";
      const rapidAPiKey = "5f84b2892dmshed0e31c7e041fdfp1df0bajsncb57d2b3b62e";
      let dankmemerOn = false;
      let cpm;
      let totalLoops = 0;
      let totalCoins = 0;
      let messageSent;
      let modules;
      return class Selfbot extends Plugin {

        async onStart() {

          fs.mkdir(__dirname + '/SelfbotData/Backup/Emojis', { recursive: true }, (err) => {
            if (err) BdApi.showToast(err, { type: "error" });
          });

          let user = await fetch(`https://discord.com/api/v8/users/@me`, {
            headers: {
              authorization: this.settings.token,
              "Content-Type": 'application/json'
            },
            method: "GET"
          }).then(res => res.json());
          if (user.message == "401: Unauthorized") {
            BdApi.Plugins.disable("Selfbot")
            BdApi.showToast('Invalid Token, please fix it in settings', { type: "error" });
          } else {
            BdApi.showToast("Token verified, you're good to go!", { type: "success" });
          }

          const catApiKey = "ea42f3a5-746d-417f-be9f-1313c6b452f5";

          let catIds = {};
          const data = await fetch(`https://api.thecatapi.com/v1/breeds`, {
            headers: {
              "x-api-key": catApiKey
            }
          }).then(res => res.json());
          data.forEach(cat => {
            Object.defineProperty(catIds, `${cat.name.toLowerCase()}`, { value: cat.id })
          })

          function wait(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
          }

          function hexToDec(hexString) {
            return parseInt(hexString.substring(1), 16);
          }

          function getAllMessageParts(messageParts) {
            let message = "";
            messageParts.forEach(messagePart => {
              if (messagePart.type === "text") {
                message += messagePart.text
              } else if (messagePart.type === "userMention") {
                message += `<@${messagePart.userId}>`
              } else if (messagePart.type === "emoji") {
                message += messagePart.name
              }
            })
            return message;
          }

          

          const SendClydeEmbed = (channel_id, embed) => {
            if (!embed.footer) {
              embed.footer = {
                text: "Jefff-Cord",
                icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
              }
            }
            if (!embed.color) {
              embed.color = hexToDec(this.settings.other.embedColor);
            }
            if (embed.timestamp) {
              delete embed.timestamp;
            } else {
              embed.timestamp = new Date().toISOString();
            }
            SendClyde(channel_id, "", [embed]);
          }
          const SendMessage = async (channel_id, message, token = this.settings.token) => {
            // BdApi.findModuleByProps("sendMessage").sendMessage(channel_id, { content: msgContent, nonce: Date.now() * (2 * 22), validNonShortcutEmojis: [] })
            const data = await fetch(`https://discord.com/api/v8/channels/${channel_id}/messages`, {
              method: "POST",
              headers: {
                Authorization: token,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                content: message,
                tts: false,
                nonce: `${Date.now() * (2 * 22)}`
              })
            }).then(res => res.json());
            if (data.message == "Missing Access") BdApi.showToast('User does not have access to server/channel', { type: "error" });
          }

          const SendClydeStatus = (channel_id, message, type) => {
            let embed = {
              description: message.toString(),
              type: "rich",
              thumbnail: {
                height: 100,
                width: 100
              }
            }
            switch (type) {
              case "success":
                embed.title = "Success",
                  embed.color = 1175572,
                  embed.thumbnail.url = "https://cdn.discordapp.com/emojis/717430953936683039.png?v=1"
                break;
              case "error":
                embed.title = "Error!",
                  embed.color = 15077392,
                  embed.thumbnail.url = "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png"
            }
            SendClydeEmbed(channel_id, embed);
          }

          const SendEmbed = async (channel_id, embed) => {
            if (!embed.footer) {
              embed.footer = {
                text: "Jefff-Cord",
                icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
              }
            }
            if (!embed.color) {
              embed.color = hexToDec(this.settings.other.embedColor);
            }
            if (embed.timestamp) {
              delete embed.timestamp;
            } else {
              embed.timestamp = new Date().toISOString();
            }
            fetch(`https://discord.com/api/v8/channels/${channel_id}/messages`, {
              headers: {
                authorization: this.settings.token,
                "Content-Type": 'application/json'
              },
              method: "POST",
              body: JSON.stringify({ embed })
            })
          }



          modules = [
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
                  options: [{ name: "id", type: 3, description: "User ID", required: true }],
                  execute: async function(e, t) {
                    console.log(e.id[0].text);
                    const user = BdApi.findModuleByProps("getCurrentUser").getUser(`${e.id[0].text}`);

                    SendClydeEmbed(t.channel.id, {
                      title: `Information for User: ${user.username}`,
                      type: "rich",
                      thumbnail: {
                        url: `${user.avatarURL}`,
                        height: 128,
                        width: 128
                      },
                      fields: [
                        {
                          name: "Username",
                          value: `${user.tag}`
                          },
                        {
                          name: "ID",
                          value: `${user.id}`
                          },
                        {
                          name: "Account created at",
                          value: `${user.createdAt}`
                          }
                        ]
                    });
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
                      SendClydeStatus(t.channel.id, err, "error")
                    }
                  }
                },
                {
                  name: "joinserver",
                  description: "Joins a server from an invite code.",
                  options: [{
                    type: 3,
                    name: "invite code",
                    required: true
                  }],
                  execute: async (e, t) => {
                    const data = await fetch(`https://discord.com/api/v8/invites/${e["invite code"][0].text}`, {
                      method: "POST",
                      headers: {
                        authorization: this.settings.token,
                        "Content-Type": "application/json"
                      }
                    }).then(res => res.json());
                  }
                },
                {
                  name: "texttospeech",
                  description: "Sends a text to speech of your text",
                  options: [{type: 3, name: "text", required: true}, {type: 4, name: "speed (-10 - 10)", required: false}, {type: 3, name: "language code", required: false}],
                  execute: async (e, t) => {
                    let language = "en-us";
                    let speed = 1;
                    if (e["speed (-10 - 10)"]) speed = e["speed (-10 - 10)"][0].text;
                    if (e["language code"]) language = e["language code"][0].text;

                    await fetch(`https://api.voicerss.org/?key=${ttsApiKey}&hl=${language}&src=${getAllMessageParts(e.text)}&r=${speed}`)
                      .then(res => res.blob())
                      .then(blobData => {
                        BdApi.findModuleByProps('instantBatchUpload').upload(t.channel.id, blobData, 0, "irrelevant text", false, "tts.wav");
                      })
                      .catch(err => {
                        BdApi.showToast("An error occured", {type: "error"});
                        console.log(err);
                      });
                  }
                }
              ]
            }, {
              name: "Fun",
              icon: {
                path: `M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-12c.331 1.465 2.827 4 6.001 4 3.134 0 5.666-2.521 5.999-4zm0-3.998l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002zm-7 0l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002z`,
                height: 24,
                width: 24,
                viewBox: "0 0 24 24",
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
                          throw "Invalid cat breed. You can find a list of valid breeds here: https://thecatapi.com"
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
                    } catch (err) {
                      SendClydeStatus(t.channel.id, err, "error")
                    }
                  }
                 },
                {
                  name: "lenny",
                  description: "Appends ( ͡° ͜ʖ ͡°) to your message.",
                  options: [{ type: 3, name: "message", required: false }],
                  execute: (e, t) => {
                    let message = "";
                    if (e.message) {
                      e.message.forEach(messagePart => {
                        if (messagePart.type === "text") {
                          message += messagePart.text
                        } else if (messagePart.type === "userMention") {
                          message += `<@${messagePart.userId}>`
                        } else if (messagePart.type === "emoji") {
                          message += messagePart.name
                        }
                      })
                    }
                    message += " ( ͡° ͜ʖ ͡°)";

                    SendMessage(t.channel.id, message);
                  }
                },
                {
                  name: "say",
                  description: "Sends a message. Useful if the token inputted isn't your own.",
                  options: [{ name: "message", type: 3, description: "Message content", required: true }],
                  execute: function(e, t) {
                    let message = "";
                    e.message.forEach(messagePart => {
                      if (messagePart.type === "text") {
                        message += messagePart.text
                      } else if (messagePart.type === "userMention") {
                        message += `<@${messagePart.userId}>`
                      } else if (messagePart.type === "emoji") {
                        message += messagePart.name
                      }
                    })
                    SendMessage(t.channel.id, message);
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
                //       SendClydeStatus(t.channel.id, err, "error")
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
                      SendClydeStatus(t.channel.id, err, "error")
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
                  description: "Toggles the dank memer farmer",
                  options: [],
                  execute: async (e, t) => {
                    if (dankmemerOn) {
                      totalCoins = 0;
                      cpm = 0;
                      BdApi.showToast('Dank Memer Farmer off, it will stop after the current loop. If you really need it stopped now you can restart discord', { type: "success" });
                      dankmemerOn = false;
                      if (document.contains(document.getElementById("dankmemer"))) {
                        document.getElementById("dankmemer").parentNode.removeChild(document.getElementById("dankmemer"));
                      }
                      FluxDispatcher.unsubscribe("MESSAGE_CREATE", messageSent);
                      return;
                    }
                    if (Object.entries(this.settings.dankmemer).filter(f => f[1] !== false).length === 0) {
                      BdApi.showToast('Failed to start: Please select at least one currency command', { type: "error" });
                      return
                    }
                    BdApi.showToast('Dank Memer Farmer On', { type: "success" });
                    dankmemerOn = true;

                    const formatter = new Intl.NumberFormat();

                    function average(nums) {
                      return nums.reduce((a, b) => (a + b)) / nums.length;
                    }

                    const botId = "270904126974590976";

                    if (this.settings.advancedMemer.status) {
                      let style = document.createElement('style');
                      style.type = 'text/css';
                      style.innerHTML = `
                          .memerinfo {
                            position: absolute;
                            top: ${this.settings.advancedMemer.viewheight}vh;
                            left: ${this.settings.advancedMemer.viewwidth}vw;
                            color: ${this.settings.advancedMemer.color};
                            font-weight: bold;
                            font-size: 13px;
                            z-index: 99999999999;
                          }
                          .memerinfo > * {
                            margin-right: 10px;
                            display: inline-block;
                          }
                        `;
                      document.getElementsByTagName('head')[0].appendChild(style);

                      const memerinfo = document.createElement("div");
                      memerinfo.id = "dankmemer";
                      memerinfo.className = "memerinfo";

                      var amountDepositedElement = document.createElement("h1");
                      memerinfo.appendChild(amountDepositedElement);

                      var totalMoneyElement = document.createElement("h1");
                      memerinfo.appendChild(totalMoneyElement);

                      document.body.appendChild(memerinfo);
                      amountDepositedElement.innerText = "Average ⏣/minute:";
                      totalMoneyElement.innerText = "Total Money:";
                    }


                    //topbar.append(memerinfo);


                    function getMoney(text) {
                      const matches = /⏣ [0-9,]+/.exec(text);

                      if (matches !== null) {
                        return parseInt(matches[0].replace(/[⏣,]/g, ""));
                      } else {
                        return 0;
                      }
                    }

                    messageSent = async (...args) => {
                      if ((args[0].channelId != t.channel.id) || (args[0].message.author.id != botId)) return;

                      const content = args[0].message.content;
                      let embed = args[0].message.embeds[0];
                      if (embed === undefined) embed = {};

                      if (!("title" in embed)) embed.title = "nothing to find here";
                      if (!("description" in embed)) embed.description = "nothing to find here";
                      if (!("footer" in embed)) embed.footer = { text: "nothing to find here" };
                      if (!("author" in embed)) embed.author = { name: "nothing to find here" };
                      if (!("fields" in embed)) embed.fields = [{ name: "nothing to find here", value: "nothing to find here" }, { name: "nothing to find here", value: "nothing to find here" }];

                      // if the message is an embed:
                      if (embed.author.name.includes("trivia question")) {
                        SendMessage(t.channel.id, ["A", "B", "C", "D"][Math.floor(Math.random() * 4)]);
                      } else if (embed.description.includes("A number secret between")) {
                        const hint = embed.description.match(/(?<=\*)(.*?)(?=\*)/g)[1];
                        if (hint > 50) {
                          SendMessage(t.channel.id, "low");
                        } else {
                          SendMessage(t.channel.id, "high");
                        }
                      } else if (content.includes("Where do you want to search")) {
                        const safest = ["coat", "dresser", "pantry", "grass", "sink", "pocket", "mailbox", "shoe", "laundromat", "van", "vacuum", "couch", "uber", "vacuum", "glovebox", "bushes", "attic", "bed", "air", "tree", "dog", "dumpster", "street", "sewer", "hospital", "area51", "bank", "purse"];
                        const mostProfit = ["area51", "air", "purse", "sewer", "bank", "dog", "tree", "hospital", "attic", "van", "glovebox", "uber", "coat", "couch", "dresser", "street", "discord", "grass", "dumpster", "mailbox", "pantry", "shoe", "bus", "sink", "laundromat", "pocket", "bed"];

                        const options = content.match(/`(.*?)`/g).map(i => i.replace(/`/g, ""));

                        if (this.settings.advancedMemer.searchPreference == "safe") {
                          safest.some(thing => {
                            if (options.includes(thing)) {
                              SendMessage(t.channel.id, thing)
                              return true
                            }
                          })
                        } else if (this.settings.advancedMemer.searchPreference == "dangerous") {
                          mostProfit.some(thing => {
                            if (options.includes(thing)) {
                              SendMessage(t.channel.id, thing)
                              return true
                            }
                          })
                        } else {
                          SendMessage(t.channel.id, options[Math.floor(Math.random() * 3)]);
                        }
                      } else if (content.includes("What type of meme do you want to post")) {
                        SendMessage(t.channel.id, ["f", "r", "i", "c", "k"][Math.floor(Math.random() * 5)]);
                      } else if (content.includes("ITS A DRAGON")) {
                        const dragonWord = content.substring(content.lastIndexOf("Type ") + 6, content.lastIndexOf("`")).replace(/﻿/g, "");
                        SendMessage(t.channel.id, dragonWord);
                      } else if (content.includes("fish is too strong")) {
                        const fishWord = content.substring(content.lastIndexOf("Type ") + 6, content.lastIndexOf("`")).replace(/﻿/g, "");
                        SendMessage(t.channel.id, fishWord);
                      } else if (content.includes("Type `h` to **hit**")) {
                        SendMessage(t.channel.id, "s");
                      } else if (content.includes("You got that answer correct")) {
                        tempMoney + Number(content.match(/[0-9]/g).join(""));
                      } else if (embed.footer.text.includes("Multi Bonus")) {
                        // this seems to be true for most commands where you gain money
                        tempMoney += getMoney(embed.description);
                      } else if (content.includes("meme")) {
                        tempMoney += getMoney(content);
                      } else if (embed.author.name.includes("gambling game") || embed.author.name.includes("slot machine") || embed.author.name.includes("blackjack game")) {
                        if (embed.description.includes("won")) {
                          tempMoney += getMoney(embed.description);
                        } else if (embed.description.includes("lost")) {
                          tempMoney -= 10;
                        }
                      } else if (embed.footer.text.includes("snakeeyes")) {
                        FluxDispatcher.subscribe("MESSAGE_UPDATE", messageUpdate);

                        function messageUpdate(...args) {
                          if (args[0].message.channel_id != t.channel.id) return;

                          if (args[0].message.embeds[0].description.includes("lost")) {
                            tempMoney -= 10;
                            FluxDispatcher.unsubscribe("MESSAGE_UPDATE", messageUpdate);
                          } else if (args[0].message.embeds[0].description.includes("won")) {
                            tempMoney += getMoney(args[0].message.embeds[0].description);
                            FluxDispatcher.unsubscribe("MESSAGE_UPDATE", messageUpdate);
                          }

                        };
                      } else if (/died|MURDERED|instantly get shot by the government/.test(embed.description)) {
                        tempMoney = 0;
                      }

                      /*else if (content.includes("deposited, current bank balance is") && this.settings.dankmemer.deposit) {
                        const amountDeposited = content.substring(content.indexOf("⏣") + 2, content.indexOf("deposited") - 3).replace(/,/g, "");
                        amountsDeposited.push(parseInt(amountDeposited));
                        const averageAmountDeposited = average(amountsDeposited);
                        // calculate ratio from 50-60 seconds
                        cpm = 60 * (averageAmountDeposited / 50);
                        cpm = `Average ⏣/minute: ⏣ ${formatter.format(cpm)}`
                        totalCoins = content.substring(content.lastIndexOf("⏣") + 2, content.indexOf(".") - 2).replace(/,/g, "");
                        totalCoins = `Total Money: ⏣ ${formatter.format(totalCoins)}`
                        if (this.settings.advancedMemer.status) {
                          amountDepositedElement.innerText = cpm;
                          totalMoneyElement.innerText = totalCoins;
                        }

                      }*/


                      // UNCOMMENT THIS TO SEE EACH BOT MESSAGE LOGGED TO CONSOLE
                      // if (args[0].channelId == t.channel.id && args[0].message.author.id == botId) {
                      //   console.log(args[0].message);
                      // }

                    }
                    // Subscribe.
                    FluxDispatcher.subscribe("MESSAGE_CREATE", messageSent);

                    let coinsPerLoop = [];

                    // ty joder for this im braindead at coding
                    let tempMoney = 0;
                    while (dankmemerOn) {
                      totalLoops++;
                      const commandsOn = Object.entries(this.settings.dankmemer).filter(f => f[1] !== false).length;
                      let timeToWait = 50 / commandsOn * 1000;
                      if (this.settings.dankmemer.fish) {
                        SendMessage(t.channel.id, "pls fish");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.hunt) {
                        SendMessage(t.channel.id, "pls hunt");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.beg) {
                        SendMessage(t.channel.id, "pls beg");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.postmemes) {
                        SendMessage(t.channel.id, "pls postmemes");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.search) {
                        SendMessage(t.channel.id, "pls search");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.highlow) {
                        SendMessage(t.channel.id, "pls hl");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.trivia) {
                        SendMessage(t.channel.id, "pls trivia");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.gamble) {
                        SendMessage(t.channel.id, "pls gamble 10");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.snakeeyes) {
                        SendMessage(t.channel.id, "pls snakeeyes 10");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.slots) {
                        SendMessage(t.channel.id, "pls slots 10");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.blackjack) {
                        SendMessage(t.channel.id, "pls bj 10");
                        await wait(timeToWait);
                      }
                      if (this.settings.dankmemer.deposit) {
                        SendMessage(t.channel.id, "pls dep max");
                        await wait(timeToWait);
                      }
                      totalCoins += tempMoney;

                      coinsPerLoop.push(tempMoney);
                      const averageAmountPerLoop = average(coinsPerLoop);
                      // calculate ratio from 50-60 seconds
                      cpm = 60 * (averageAmountPerLoop / 50);
                      cpm = `Average ⏣/minute: ⏣ ${formatter.format(cpm)}`;
                      if (this.settings.advancedMemer.status) {
                        amountDepositedElement.innerText = cpm;
                        totalMoneyElement.innerText = `Total Money: ⏣ ${formatter.format(totalCoins)}`;
                      }
                      tempMoney = 0;
                    }
                  }
                },
                {
                  name: "cpm",
                  description: "Shows info about the Dank Memer Bot",
                  options: [],
                  execute: function(e, t) {
                    if (!dankmemerOn) {
                      BdApi.showToast('Dank Memer Farmer must be running!', { type: "error" });
                      return
                    }

                    const embed = {
                      title: "Dank Memer Farmer Info",
                      type: "rich",
                      fields: [
                        {
                          name: "Average Coins Per Minute",
                          value: `${cpm}`
                        }, {
                          name: "Coins Gained in Current Session",
                          value: `⏣ ${totalCoins}`
                        }, {
                          name: "Total Time Running",
                          value: `${new Date(totalLoops * 50 * 1000).toISOString().substr(11, 8)}`
                        }
                      ]
                    }

                    SendClydeEmbed(t.channel.id, embed);
                  }
                },
                {
                  name: "cats",
                  description: "Lists all the cat breeds",
                  options: [],
                  execute: function(e, t) {
                    let cats = "";
                    Object.getOwnPropertyNames(catIds).forEach(cat => {
                      cats += cat + "\n";
                    })

                    const embed = {
                      title: "Cat Breeds",
                      description: cats
                    }

                    SendClydeEmbed(t.channel.id, embed);
                  }
                }
              ]
            }, {
              name: "Autism",
              icon: {
                path: `M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z`,
                height: 24,
                width: 24,
                viewBox: "0 0 15 19"
              },
              commands: [
                {
                  name: "crash",
                  description: "Sends a discord crash gif/video",
                  options: [],
                  execute: async (e, t) => {
                    

                    
                    BdApi.showToast("idk what the script is lmao", {type: "error"});
                    

                      
                    
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
                  execute: async (e, t) => {
                    BdApi.showToast('Started Server Backup', { type: "success" });

                    fs.unlink(__dirname + '/SelfbotData/Backup/Server Invites.json', err => {
                      if (err) return;
                    });

                    let fileContent = [];
                    // shit-code.exe
                    const userGuilds = await fetch(`https://discord.com/api/v8/users/@me/guilds`, {
                      headers: {
                        authorization: this.settings.token,
                      }
                    }).then(res => res.json())
                    for (var i = 0; i < userGuilds.length; i++) {
                      await wait(1000);
                      try {
                        if (userGuilds[i].features.includes("VANITY_URL")) {
                          fileContent.push({
                            serverName: userGuilds[i].name,
                            inviteCode: BdApi.findModuleByProps("getGuild").getGuild(userGuilds[i].id).vanityURLCode
                          })
                          BdApi.showToast(`Backed Up: ${userGuilds[i].name}, with its vanity URL`, { type: "success" });
                        } else {
                          const guildIcon = `https://cdn.discordapp.com/icons/${userGuilds[i].id}/${userGuilds[i].icon}.webp?size=128`;

                          const channels = await fetch(`https://discord.com/api/v8/guilds/${userGuilds[i].id}/channels`, {
                            headers: {
                              authorization: this.settings.token
                            }
                          }).then(res => res.json()).catch(err => SendClydeStatus(t.channel.id, err, "error"));
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
                            throw `No permissions to create invite in server ${userGuilds[i].name}`;
                          }

                          await wait(5000);
                          BdApi.findModuleByProps("createInvite").createInvite(channelId, { max_age: 0 })
                            .then(res => {
                              fileContent.push({
                                serverName: res.guild.name,
                                inviteCode: res.code
                              })
                              BdApi.showToast(`Backed Up: ${res.guild.name} with code ${res.code}`, { type: "success" });
                            }).catch(err => BdApi.showToast(`Failed to backup ${userGuilds[i-1].name}. Error code: ${err.status}`, { type: "error" }))
                        }

                      } catch (error) {
                        BdApi.showToast(error, { type: "error" });
                        // fileContent.push({
                        //   serverName: userGuilds[i].name,
                        //   inviteCode: false
                        // })
                      }
                    }
                    fs.writeFile(__dirname + "/SelfbotData/Backup/Server Invites.json", JSON.stringify(fileContent), err => {
                      if (err) BdApi.showToast(err, { type: "error" });

                      BdApi.showToast("Done! Check SelfbotData/Backup/Server Invites.json", { type: "success" });
                    });

                  }
                },
                {
                  name: "loadservers",
                  description: "Joins the servers from Server Invites.txt",
                  options: [],
                  execute: (e, t) => {
                    fs.access(__dirname + "/SelfbotData/Backup/Server Invites.json", fs.F_OK, (err) => {
                      if (err) {
                        BdApi.showToast(err, { type: "error" });
                        return
                      }
                      fs.readFile(__dirname + "/SelfbotData/Backup/Server Invites.json", async (err, data) => {
                        if (err) {
                          BdApi.showToast(err, { type: "error" });
                          return
                        };
                        const invites = JSON.parse(data);
                        for (const invite of invites) {
                          await wait(5000);
                          if (!invite.inviteCode) return;
                          await fetch(`https://discord.com/api/v8/invites/${invite.inviteCode}`, {
                            method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              authorization: this.settings.token
                            }
                          }).catch(err => {
                            BdApi.showToast(err, { type: 'error' });
                            return;
                          })
                          BdApi.showToast(`Joined Server: ${invite.serverName}`, { type: "success" });
                        }
                      });
                    })
                  }
                  },
                // {
                //   name: "downloademojis",
                //   description: "Downloads emojis in a given server",
                //   options: [{ type: 3, name: "serverId", required: true }, { type: 3, name: "type", choices: [{ name: "Only Animated", value: "animated" }, { name: "Only Still", value: "still" }] }],
                //   execute: async (e, t) => {
                //     // e.serverId[0].text = serverId
                //     // e.type[0].text = "Only Animated" || "Only Still"
                //     const guild = await fetch(`https://discord.com/api/v8/guilds/${e.serverId[0].text}`, {
                //       headers: {
                //         'Content-Type': 'application/json',
                //         authorization: this.settings.token
                //       }
                //     }).then(res => res.json())
                //     const path = __dirname + `/SelfbotData/Backup/Emojis/${guild.name}`;
                //     if (!fs.existsSync(path)) {
                //       fs.mkdirSync(path);
                //     }
                //     for (var i = 0; i < guild.emojis.length; i++) {
                //       const fileType = guild.emojis[i].animated ? ".gif" : ".png";
                //
                //       const response = await fetch(`https://cdn.discordapp.com/emojis/${guild.emojis[i].id}${fileType}`);
                //       console.log(response);
                //       var file = fs.createWriteStream(`${path}/${guild.emojis[i].name}${fileType}`);
                //       response.body.pipe(file);
                //
                //     }
                //   }
                //   }
                ]
              },
              {
                name: "NSFW",
                icon: {
                  path: `M12 4.942c1.827 1.105 3.474 1.6 5 1.833v7.76c0 1.606-.415 1.935-5 4.76v-14.353zm9-1.942v11.535c0 4.603-3.203 5.804-9 9.465-5.797-3.661-9-4.862-9-9.465v-11.535c3.516 0 5.629-.134 9-3 3.371 2.866 5.484 3 9 3zm-2 1.96c-2.446-.124-4.5-.611-7-2.416-2.5 1.805-4.554 2.292-7 2.416v9.575c0 3.042 1.69 3.83 7 7.107 5.313-3.281 7-4.065 7-7.107v-9.575z`,
                  height: 24,
                  width: 24,
                  viewBox: "0 0 24 24"
                },
                commands: [
                  {
                    name: "rule34",
                    description: "Finds an image using kurozenzen's API wrapper. Type \"help\" in the tags for help.",
                    options: [{type: 3, name: "tags", required: true}],
                    execute: async (e, t) => {
                      //https://github.com/kurozenzen/r34-json-api#readme
                      const tags = e.tags[0].text;

                      if (tags === "help") {
                        const embed = {
                          title: "Rule34 Tags Help",
                          type: "rich",
                          provider: {
                            name: "See docs here",
                            url: "https://github.com/kurozenzen/r34-json-api#readme"
                          },
                          description: "**Simple tag:** \`helltaker\` or \`hentai\`.\n**Wildcards:** \`*_hair\` will match \`blue_hair\`, \`red_hair\` and a bunch of other tags.\n**Prefixes:** \`score\` is the most useful, others are \`source\`, \`width\`, \`height\`, \`user\`\n\`score:>100\` will match posts with more than 100 likes.\nsame works for the others as well"
                        }

                        SendClydeEmbed(t.channel.id, embed);
                        return
                      }

                      await fetch(`https://r34-json.herokuapp.com/posts?tags=${tags}`)
                        .then(res => res.json())
                        .then(data => {
                          const post = data.posts[0];

                          if (data.count == 0) {
                            BdApi.showToast("No Results", {type: "error"});
                            return
                          } else if (post.type === "video") {
                            SendMessage(t.channel.id, `${post.sample_url.substring(42)}`);
                            return
                          }
                          
                          console.log(post);

                          let embed = {
                            type: "rich",
                            description: `Tags: \`${tags}\``,
                            title: "Rule34 Results",
                            url: `https://rule34.xxx/index.php?page=post&s=view&id=${post.id}`,
                            image: {
                              url: post.sample_url
                            }
                          }

                          SendEmbed(t.channel.id, embed);
                        })
                        
                    }
                  },
                ]
              },
            ]

          // Insert all commands and "modules"/sections
          modules.forEach(module => {
            SectionModule.push({
              id: `-${SectionModule.length + 1}`,
              name: module.name,
              type: 0,
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
          FluxDispatcher.unsubscribe("MESSAGE_CREATE", messageSent);
        }

        observer(changes) {
          // console.log(changes);
          try {

            if (changes.addedNodes[0].className.includes("outerWrapper")) {
              // load icons on left
              const listOfCategories = `div[aria-expanded="false"] > div > div:nth-of-type(2) > div > div > div > div > div`;
              
              modules.slice().reverse().forEach(module => {
                const categorySVG = `${listOfCategories} > div > div[aria-label="${module.name}"] > div > svg`;
                document.querySelector(categorySVG).setAttribute("height", module.icon.height);
                document.querySelector(categorySVG).setAttribute("width", module.icon.width);
                document.querySelector(categorySVG).setAttribute("viewBox", module.icon.viewBox);
                document.querySelector(`${categorySVG} > path`).setAttribute("d", module.icon.path);
              })

              const paddingElement = document.createElement("div");

              paddingElement.style.paddingBottom = "10px";

              document.querySelector(listOfCategories).appendChild(paddingElement);

            } else {
              // load small icons
              modules.forEach(module => {
                if (changes.addedNodes[0].innerText.startsWith(module.name.toUpperCase())) {
                  const icons = document.querySelectorAll(`div > div > div > div[dir="ltr"] > div > div > div > div > span`);
                  const correctIcon = Array.from(icons).filter(icon => icon.innerText.toLowerCase() == module.name.toLowerCase())[0];
                  let svg = correctIcon.parentNode.firstChild.firstChild.firstChild;
                  svg.setAttribute("viewBox", module.icon.viewBox);
                  svg.firstChild.setAttribute("d", module.icon.path);
                }
              })

            }

          } catch {}
        }

        getSettingsPanel() {
          const panel = this.buildSettingsPanel();
          let listener = false;
          panel.addListener((...args) => {
            if (args[0] == "token" && listener == false) {
              listener = true;
              document.querySelector(".da-flex > button.bd-button").addEventListener("click", async () => {

                const data = await fetch(`https://discord.com/api/v8/users/@me`, {
                  headers: {
                    authorization: this.settings.token,
                    "Content-Type": 'application/json'
                  },
                  method: "GET"
                }).then(res => res.json());
                if (data.message == "401: Unauthorized") {
                  BdApi.Plugins.disable("Selfbot")
                  BdApi.showToast('Invalid Token', { type: "error" });
                } else {
                  BdApi.showToast('Valid Token', { type: "success" });
                  user = data;
                }
              })
            } else if (args[0] == "advancedMemer") {
              switch (args[1]) {
                case "viewheight":
                  document.getElementById("dankmemer").style.top = `${args[2]}vh`;
                  break;
                case "viewwidth":
                  document.getElementById("dankmemer").style.left = `${args[2]}vw`;
                  break;
                case "color":
                  document.getElementById("dankmemer").style.color = args[2];
                  break;
              }
            }
          })
          return panel.getElement();
        }
      };

    };
    return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();