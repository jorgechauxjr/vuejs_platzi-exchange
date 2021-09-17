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

export default {
  getAssets,
  getAsset,
};
