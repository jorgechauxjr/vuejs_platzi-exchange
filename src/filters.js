// por ser libreria y no archivo NO utilizo @ ni ninguna ruta, solo el nombre.
// En este caso "numeral"
import numeral from "numeral";

// value es el valor recibido por la vista
const dollarFilter = function (value) {
  if (!value) {
    return "$0";
  }
  return numeral(value).format("($ 0.00a");
};

const percentFilter = function (value) {
  if (!value) {
    return "%0";
  }
  // Number es para hacer Parse en caso que venga en formato string
  // toFixed para que sean solo 2 decimales
  return `${Number(value).toFixed(2)}%`;
};

export { dollarFilter, percentFilter };
// no se exporta default porque la idea de los filtros es que despues se
// puedan importar de manera atomica, es decir solo dolar filter sin importar
// otro filtro que tenga en el archivo
