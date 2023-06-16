let precioRosa = 8
let numeroRosas = 70
let precioLirio = 10
let numeroLirios = 50
let precioTulipan = 2
let numeroTulipanes = 120

let totalRosas = precioRosa * numeroRosas
let totalLirios = precioLirio * numeroLirios
let totalTulipanes = precioTulipan * numeroTulipanes

let totalFlores = totalRosas + totalLirios + totalTulipanes

console.log(
    `Rosa: precio unitario: ${precioRosa}, cantidad: ${numeroRosas}, valor: ${totalRosas}\n` +
    `Lirio: precio unitario: ${precioLirio}, cantidad: ${numeroLirios}, valor: ${totalLirios}\n` +
    `Tulipán: precio unitario: ${precioTulipan}, cantidad: ${numeroTulipanes}, valor: ${totalTulipanes}\n` +
    `Total: ${totalFlores}`
);