import  minimist from "minimist";

function parseaParams(argv) {
  // Usa minimist para parsear los argumentos
  const resultado = minimist(argv);
  return resultado; // Devuelve el resultado
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params); // Muestra los parámetros parseados
}

main();
