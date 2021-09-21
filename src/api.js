// Aqui (api.js) van las diferentes implementaciones de la API de coinCAP
// https://docs.coincap.io/?version=latest

const url = "https://api.coincap.io/v2";

// funciones que usaran fetch para acceder y obtener información de la API
// usamos promises para obtener respuesta en formato json
// data es el objeto que viene dentro del body de la response
// data --- porque en la API de coinCap vemos que dice data
// https://docs.coincap.io/?version=latest#ee0c0be6-513f-4466-bbb0-2016add462e9

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then((resp) => resp.json())
    .then((res) => res.data);
}

// Vamos a acceder al valor de la variable coin `${url}/assets/${coin}`

function getAsset(coin) {
  return fetch(`${url}/assets/${coin}`)
    .then((resp) => resp.json())
    .then((res) => res.data);
}

// parametro "interval" para obtener valor por horas, es decir 24 resultados porque es 1 dia
// now.getdate() - 1 asigna fecha de un dia anterios
// end: valor de ahora
// start: valor de ahora menos un dia
function getAssetHistory(coin) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then((resp) => resp.json())
    .then((res) => res.data);
}

function getMarkets(coin) {
  return fetch(`${url}/assets/${coin}/markets?limit=5`)
    .then(res => res.json())
    .then(res => res.data)
}

function getExchange(id) {
  return fetch(`${url}/exchanges/${id}`)
    .then(res => res.json())
    .then(res => res.data)
}

export default {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory,
};
