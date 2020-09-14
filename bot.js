"use strict";
const Telegraf = require('telegraf')
const axios = require('axios')

const bot = new Telegraf('INSERT_YOUR_BOT_TOKEN_HERE')

bot.start((ctx) => {
  ctx.reply('Seja bem-vindo ao Bot LQX, para saber as cotações em cada corretora, clique no botão MENU', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "MENU", callback_data: "lqx" }]
      ]
    }
  })
})

bot.launch()

bot.action('lqx', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'Selecione uma das corretoras abaixo para saber a cotação do LQX:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "EXC Cripto", callback_data: "exc" }, { text: "CointradeCX", callback_data: "ct" }],
        [{ text: "Tecnopag", callback_data: "tp" }, { text: "TODAS", callback_data: "all" }],
        [{ text: "\u{2139} LQX INFO", callback_data: "info" }, { text: "Links Úteis \u{1F195}", callback_data: "links" }]
      ]
    }
  })
})

bot.action('exc', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  getdataexc()
    .then((result) => {
      ctx.telegram.sendMessage(ctx.chat.id, result,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: " \u{1F195} Acessar o book de oferta", callback_data: "bookexc" }, { text: "Voltar para o menu anterior", callback_data: "go-back" }]
            ]
          }
        })
    })
})

bot.action('bookexc', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  getbookexc()
    .then((result) => {
      ctx.telegram.sendMessage(ctx.chat.id, result,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{2795} Ver Mais", url: "https://www.sualqx.com.br/excCripto"}, { text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
            ]
          }
        })
    })
})

bot.action('ct', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  getdatact()
    .then((result) => {
      ctx.telegram.sendMessage(ctx.chat.id, result,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{2795} Acessar o book de oferta", callback_data: "bookct"}, { text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
            ]
          }
        })
    })
})

bot.action('bookct', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  getbookct()
    .then((result) => {
      ctx.telegram.sendMessage(ctx.chat.id, result,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{2795} Ver Mais", url: "https://www.sualqx.com.br/cointrade"}, { text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
            ]
          }
        })
    })
})

bot.action('tp', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  getdatatp()
    .then((result) => {
      ctx.telegram.sendMessage(ctx.chat.id, result,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
            ]
          }
        })
    })
})

bot.action('all', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const resultGetAll = await getdataall();
  ctx.telegram.sendMessage(ctx.chat.id, `${resultGetAll.variavel1} \n ${resultGetAll.variavel2} \n ${resultGetAll.variavel3} \n ${resultGetAll.variavel4}`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('links', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Selecione um dos links úteis abaixo relacionado à Comunidade de LQX:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Informações do LQX", callback_data: "info" }, { text: "Youtube", url: "https://www.youtube.com/c/LqxCommunity" }],
        [{ text: "Telegram", url: "https://www.instagram.com/lqxcommunity/" }, { text: "Canal Telegram (Info)", url: "https://t.me/lqxcoincommunity" }],
        [{ text: "Grupo Telegram", url: "https://t.me/lqxcommunitygroup" }, { text: "Bot LQX", url: "https://t.me/lqx_bot" }],
        [{ text: "Bot LQX (Histórico)", url: "https://t.me/lqxh_bot" }, { text: "Block Explorer", url: "http://explorer.lqxcrypto.com/" }],
        [{ text: "Sua LQX", url: "https://www.sualqx.com.br/" }, { text: "Tecnopag", url: "https://tecnopag.com/" }],
        [{ text: "Exc Cripto", url: "https://exccripto.com/v3/br/" }, { text: "CointradeCX", url: "https://cointradecx.com/" }],
        [{ text: "Folgory", url: "https://folgory.com/" }, { text: "WeHPM", url: "https://wehpm.com" }],
        [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
      ]
    }
  })
})

bot.action('info', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Selecione uma das informações sobre o LQX que deseja saber:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Site do LQX", url: "https://lqxcoin.com/" }, { text: "Código do LQX", url: "https://github.com/coinlqx/lqx" }],
        [{ text: "Dificuldade da Rede", callback_data: "diff" }, { text: "Bloco Atual", callback_data: "block" }],
        [{ text: "Moedas em Circulação", callback_data: "supply" }, { text: "Quantidade de Masternodes", callback_data: "mn" }],
        [{ text: "Volume Total de BRL em 24h", callback_data: "brl-total" }, { text: "Volume Total de LQX em 24h", callback_data: "lqx-total" }],
        [{ text: "MARKETCAP", callback_data: "mc" }, { text: "\u{2139} TODAS AS INFOS", callback_data: "all-info" }],
        [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
      ]
    }
  })
})

bot.action('go-back', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Selecione uma das corretoras abaixo para saber a cotação do LQX:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "EXC Cripto", callback_data: "exc" }, { text: "CointradeCX", callback_data: "ct" }],
        [{ text: "Tecnopag", callback_data: "tp" }, { text: "TODAS", callback_data: "all" }],
        [{ text: "\u{2139} LQX INFO", callback_data: "info" }, { text: "Links Úteis \u{1F195}", callback_data: "links" }]
      ]
    }
  })
})

bot.action('back-info', (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Selecione uma das informações sobre o LQX que deseja saber:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Site do LQX", url: "https://lqxcoin.com/" }, { text: "Código do LQX", url: "https://github.com/coinlqx/lqx" }],
        [{ text: "Dificuldade da Rede", callback_data: "diff" }, { text: "Bloco Atual", callback_data: "block" }],
        [{ text: "Moedas em Circulação", callback_data: "supply" }, { text: "Quantidade de Masternodes", callback_data: "mn" }],
        [{ text: "Volume Total de BRL em 24h", callback_data: "brl-total" }, { text: "Volume Total de LQX em 24h", callback_data: "lqx-total" }],
        [{ text: "MARKETCAP", callback_data: "mc" }, { text: "\u{2139} TODAS AS INFOS", callback_data: "all-info" }],
        [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "go-back" }]
      ]
    }
  })
})

bot.action('diff', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await getdifficulty();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('block', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await getblockcount();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('supply', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await getmoneysupply();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('mn', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await getmasternodecount();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('brl-total', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await totalbrl();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('lqx-total', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await totallqx();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('mc', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const result = await getmarketcap();
  ctx.telegram.sendMessage(ctx.chat.id, result,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

bot.action('all-info', async (ctx) => {
  ctx.deleteMessage()
  ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
  const resultGetAll = await getallinfo();
  ctx.telegram.sendMessage(ctx.chat.id, `${resultGetAll.variavel1} \n ${resultGetAll.variavel2} \n ${resultGetAll.variavel3} \n ${resultGetAll.variavel4} \n ${resultGetAll.variavel5} \n ${resultGetAll.variavel6} \n ${resultGetAll.variavel7}`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F519} Voltar para o menu anterior", callback_data: "back-info" }, { text: "\u{1F519} Voltar para o menu principal", callback_data: "go-back" }]
        ]
      }
    })
})

async function getdataexc() {
  const url = 'https://trade.exccripto.com/api/v3/public/getmarketsummary?market=LQX_CBRL'
  let res = await axios.get(url)
  const quotes = res.data.result

  return `Cotação do LQX na EXC Cripto:
  Preço de Venda: ${quotes.Ask}
  Preço de Compra: ${quotes.Bid}
  Volume cBRL (24h): ${parseFloat(quotes.BaseVolume.toFixed(3))}
  Volume LQX (24h): ${parseFloat(quotes.Volume.toFixed(3))}
  `
}

async function getbookexc() {
  const urlb = 'https://www.sualqx.com.br/api/book?exchange=exccripto&type=buy&lines=5'
  const urls = 'https://www.sualqx.com.br/api/book?exchange=exccripto&type=sell&lines=5'
  let resb = await axios.get(urlb)
  let ress = await axios.get(urls)
  const quotesb = resb.data
  const quotess = ress.data

  return `
  Book de COMPRA do LQX na EXC Cripto:

  1: Quantidade: ${quotesb.result[0].quantity} / Valor: ${quotesb.result[0].price} / Total: ${quotesb.result[0].total_brl} cBRL
  2: Quantidade: ${quotesb.result[1].quantity} / Valor: ${quotesb.result[1].price} / Total: ${quotesb.result[1].total_brl} cBRL
  3: Quantidade: ${quotesb.result[2].quantity} / Valor: ${quotesb.result[2].price} / Total: ${quotesb.result[2].total_brl} cBRL
  4: Quantidade: ${quotesb.result[3].quantity} / Valor: ${quotesb.result[3].price} / Total: ${quotesb.result[3].total_brl} cBRL
  5: Quantidade: ${quotesb.result[4].quantity} / Valor: ${quotesb.result[4].price} / Total: ${quotesb.result[4].total_brl} cBRL

  Book de VENDA do LQX na EXC Cripto:

  1: Quantidade: ${quotess.result[0].quantity} / Valor: ${quotess.result[0].price} / Total: ${quotess.result[0].total_brl} cBRL
  2: Quantidade: ${quotess.result[1].quantity} / Valor: ${quotess.result[1].price} / Total: ${quotess.result[1].total_brl} cBRL
  3: Quantidade: ${quotess.result[2].quantity} / Valor: ${quotess.result[2].price} / Total: ${quotess.result[2].total_brl} cBRL
  4: Quantidade: ${quotess.result[3].quantity} / Valor: ${quotess.result[3].price} / Total: ${quotess.result[3].total_brl} cBRL
  5: Quantidade: ${quotess.result[4].quantity} / Valor: ${quotess.result[4].price} / Total: ${quotess.result[4].total_brl} cBRL

  Fonte: SuaLQX.

  Para ver o book completo, clique no botão Ver Mais.
  `
}

async function getdatact() {
  const url = 'https://api.cointradecx.com/public/ticker?market=LQX_BRL'
  let res = await axios.get(url)
  const quotes = res.data.result[0]

  return `Cotação do LQX na CointradeCX:
  Preço de Venda: ${quotes.ask}
  Preço de Compra: ${quotes.bid}
  Volume BRL (24h): ${parseFloat(parseFloat(quotes.quoteVolume).toFixed(3))}
  Volume LQX (24h): ${parseFloat(parseFloat(quotes.vol24h).toFixed(3))}
  `
}

async function getbookct() {
  const urlb = 'https://www.sualqx.com.br/api/book?exchange=cointrade&type=buy&lines=5'
  const urls = 'https://www.sualqx.com.br/api/book?exchange=cointrade&type=sell&lines=5'
  let resb = await axios.get(urlb)
  let ress = await axios.get(urls)
  const quotesb = resb.data
  const quotess = ress.data

  return `
  Book de COMPRA do LQX na CointradeCX:

  1: Quantidade: ${quotesb.result[0].quantity} / Valor: ${quotesb.result[0].price} / Total: ${quotesb.result[0].total_brl} BRL
  2: Quantidade: ${quotesb.result[1].quantity} / Valor: ${quotesb.result[1].price} / Total: ${quotesb.result[1].total_brl} BRL
  3: Quantidade: ${quotesb.result[2].quantity} / Valor: ${quotesb.result[2].price} / Total: ${quotesb.result[2].total_brl} BRL
  4: Quantidade: ${quotesb.result[3].quantity} / Valor: ${quotesb.result[3].price} / Total: ${quotesb.result[3].total_brl} BRL
  5: Quantidade: ${quotesb.result[4].quantity} / Valor: ${quotesb.result[4].price} / Total: ${quotesb.result[4].total_brl} BRL

  Book de VENDA do LQX na CointradeCX:

  1: Quantidade: ${quotess.result[0].quantity} / Valor: ${quotess.result[0].price} / Total: ${quotess.result[0].total_brl} BRL
  2: Quantidade: ${quotess.result[1].quantity} / Valor: ${quotess.result[1].price} / Total: ${quotess.result[1].total_brl} BRL
  3: Quantidade: ${quotess.result[2].quantity} / Valor: ${quotess.result[2].price} / Total: ${quotess.result[2].total_brl} BRL
  4: Quantidade: ${quotess.result[3].quantity} / Valor: ${quotess.result[3].price} / Total: ${quotess.result[3].total_brl} BRL
  5: Quantidade: ${quotess.result[4].quantity} / Valor: ${quotess.result[4].price} / Total: ${quotess.result[4].total_brl} BRL

  Fonte: SuaLQX.

  Para ver o book completo, clique no botão Ver Mais.
  `
}

async function getdatatp() {
  const url = 'https://api.tecnopag.com/ticker/'
  let res = await axios.get(url)
  const quotes = res.data

  return `Cotação do LQX na Tecnopag:
  Preço de Venda BRL: ${parseFloat(quotes.response.data.lqx_brl).toFixed(3)}
  Preço de Venda USD: ${parseFloat(quotes.response.data.lqx_usd).toFixed(3)}
  Preço de Venda EUR: ${parseFloat(quotes.response.data.lqx_eur).toFixed(3)}
  `

}

async function getdataall() {

  const retorno = {
    variavel1: await getdataexc(),
    variavel2: await getdatact(),
    variavel3: await getdatatp(),
    variavel4: await getdatafg()
  }

  return retorno

}

async function getdatafg() {
  const url = 'https://folgory.com/api/v1'
  let res = await axios.get(url)
  const response = res.data
  const lqxbtc = response.filter((elem) => { return elem.symbol == 'LQX/BTC' })
  const quotes = lqxbtc[0]

  return `Cotação do LQX na Folgory:
  Último Preço de Venda LQX/BTC: ${quotes.last}
  `
}

async function getdifficulty() {
  const url = 'https://explorer.lqxcommunity.org/api/getdifficulty'
  let res = await axios.get(url)

  return `Dificuldade da Rede de LQX: ${parseFloat(res.data.toFixed(3))}`

}

async function getblockcount() {
  const url = 'https://explorer.lqxcommunity.org/api/getblockcount'
  await sleep(1000)
  let res = await axios.get(url)

  return `Bloco atual de LQX: ${res.data}`

}

async function getmoneysupply() {
  const url = 'https://explorer.lqxcommunity.org/ext/getmoneysupply'
  await sleep(1000)
  let res = await axios.get(url)

  return `Quantidade total de LQX em circulação: ${parseFloat(res.data.toFixed(3))}`

}

async function getmasternodecount() {
  const url = 'https://explorer.lqxcommunity.org/ext/getmasternodecount'
  await sleep(1000)
  let res = await axios.get(url)

  return `Quantidade de masternodes ativos de LQX: ${res.data}`

}

async function getbrlexc() {
  const url = 'https://trade.exccripto.com/api/v3/public/getmarketsummary?market=LQX_CBRL'
  let res = await axios.get(url)
  const quotes = res.data.result

  return quotes.BaseVolume

}

async function getbrlct() {
  const url = 'https://api.cointradecx.com/public/ticker?market=LQX_BRL'
  let res = await axios.get(url)
  const quotes = res.data.result[0]

  return quotes.quoteVolume

}

const totalbrl = async () => {
  const vexc = await getbrlexc();
  const vct = await getbrlct();

  return `Total de BRL transacionados em 24h: ${(parseFloat(vexc) + parseFloat(vct)).toFixed(3)}`
}

async function getlqxexc() {
  const url = 'https://trade.exccripto.com/api/v3/public/getmarketsummary?market=LQX_CBRL'
  let res = await axios.get(url)
  const quotes = res.data.result

  return quotes.Volume

}

async function getlqxct() {
  const url = 'https://api.cointradecx.com/public/ticker?market=LQX_BRL'
  let res = await axios.get(url)
  const quotes = res.data.result[0]

  return quotes.vol24h

}

const totallqx = async () => {
  const vexc = await getlqxexc();
  const vct = await getlqxct();

  return `Total de LQX transacionados em 24h: ${(parseFloat(vexc) + parseFloat(vct)).toFixed(3)}`
}

async function gethighexc() {
  const url = 'https://trade.exccripto.com/api/v3/public/getmarketsummary?market=LQX_CBRL'
  let res = await axios.get(url)
  const quotes = res.data.result

  return quotes.High

}

async function gethighct() {
  const url = 'https://api.cointradecx.com/public/ticker?market=LQX_BRL'
  let res = await axios.get(url)
  const quotes = res.data.result[0]

  return quotes.high24h

}

async function getqlqx() {
  const url = 'https://explorer.lqxcommunity.org/ext/getmoneysupply'
  let res = await axios.get(url)

  return parseFloat(res.data.toFixed(3))

}

const getmarketcap = async () => {
  const vexc = await gethighexc();
  const vct = await gethighct();
  const qlqx = await getqlqx();


  return `Valor de Marketcap de LQX em BRL: ${((parseFloat(vexc) + parseFloat(vct)) / 2 * parseFloat(qlqx)).toFixed(3)}`
}

const sleep = async (time) => {
  await new Promise(r => setTimeout(r, time));
}

async function getallinfo() {

  const retorno = {
    variavel1: await getdifficulty(),
    variavel2: await getblockcount(),
    variavel3: await getmoneysupply(),
    variavel4: await getmasternodecount(),
    variavel5: await totalbrl(),
    variavel6: await totallqx(),
    variavel7: await getmarketcap()
  }

  return retorno

}