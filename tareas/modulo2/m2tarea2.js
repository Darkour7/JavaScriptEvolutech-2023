const precioRosa = 8
var numeroRosas = 70
const precioLirio = 10
var numeroLirios = 50
const precioTulipan = 2
var numeroTulipanes = 120

var totalRosas = precioRosa * numeroRosas
var totalLirios = precioLirio * numeroLirios
var totalTulipanes = precioTulipan * numeroTulipanes

var totalFlores = totalRosas + totalLirios + totalTulipanes

console.log(
    `Rosa: precio unitario: ${precioRosa}, cantidad: ${numeroRosas}, valor: ${totalRosas}\n` +
    `Lirio: precio unitario: ${precioLirio}, cantidad: ${numeroLirios}, valor: ${totalLirios}\n` +
    `Tulipán: precio unitario: ${precioTulipan}, cantidad: ${numeroTulipanes}, valor: ${totalTulipanes}\n` +
    `Total: ${totalFlores}`
);

numeroRosas-=20
numeroLirios-=30

totalRosas = precioRosa * numeroRosas
totalLirios = precioLirio * numeroLirios
totalTulipanes = precioTulipan * numeroTulipanes

totalFlores = totalRosas + totalLirios + totalTulipanes

console.log(
    `Rosa: precio unitario: ${precioRosa}, cantidad: ${numeroRosas}, valor: ${totalRosas}\n` +
    `Lirio: precio unitario: ${precioLirio}, cantidad: ${numeroLirios}, valor: ${totalLirios}\n` +
    `Tulipán: precio unitario: ${precioTulipan}, cantidad: ${numeroTulipanes}, valor: ${totalTulipanes}\n` +
    `Total: ${totalFlores}`
);