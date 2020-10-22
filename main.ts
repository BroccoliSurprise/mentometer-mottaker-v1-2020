function valgResultatLEDskjerm () {
    basic.clearScreen()
    if (ja == 0 && nei == 0) {
        basic.showString("?")
    }
    // Denne For-løkken repeteres like mange ganger som antall "ja"-stemmer som har blitt mottatt. Hver repetisjon tenner et lys på skjermen, og plasseringen på skjermen forandres ved hver repetisjon. (X-aksen og Y-aksen til prikken matcher rundetallet)
    for (let indeks = 0; indeks <= ja - 1; indeks++) {
        led.plotBrightness(indeks, 0, 255)
        led.plotBrightness(indeks - 5, 1, 255)
        led.plotBrightness(indeks - 10, 2, 255)
        led.plotBrightness(indeks - 15, 3, 255)
        led.plotBrightness(indeks - 20, 4, 255)
    }
    for (let indeks = 0; indeks <= nei - 1; indeks++) {
        led.plotBrightness(4 - indeks, 4, 100)
        led.plotBrightness(4 - (indeks - 5), 3, 100)
        led.plotBrightness(4 - (indeks - 10), 2, 100)
        led.plotBrightness(4 - (indeks - 15), 1, 100)
        led.plotBrightness(4 - (indeks - 20), 0, 100)
    }
}
function valgResultatNeoPixel () {
    strip.clear()
    // For hver repetisjon settes en LEDpære til å være grønn på lenken. LEDlysene er nummererte, og hver repetisjon tenner et nytt lys i rekken.
    for (let indeks = 0; indeks <= ja - 1; indeks++) {
        strip.setPixelColor(indeks, neopixel.colors(NeoPixelColors.Green))
    }
    for (let indeks = 0; indeks <= nei - 1; indeks++) {
        strip.setPixelColor(neoPixelLengde - indeks, neopixel.colors(NeoPixelColors.Red))
    }
    strip.show()
}
input.onButtonPressed(Button.A, function () {
    stemmeUrneÅpen = true
    radio.sendString("start")
    basic.showIcon(IconNames.Yes)
    ja = 0
    nei = 0
})
radio.onReceivedString(function (receivedString) {
    // Skal kun motta stemmer når valgurnen er åpen
    if (stemmeUrneÅpen == true) {
        if (receivedString == "ja") {
            ja += 1
        } else if (receivedString == "nei") {
            nei += 1
        } else {
        	
        }
    }
})
input.onButtonPressed(Button.B, function () {
    stemmeUrneÅpen = false
    radio.sendString("stopp")
    basic.clearScreen()
    basic.pause(1000)
    valgResultatLEDskjerm()
    valgResultatNeoPixel()
})
/**
 * Dette er koden til mentometer-micro:biten!
 * 
 * Trykk på A for å åpne stemmegiving.
 * 
 * Trykk på B for å avslutte stemming, og vise resultat (Lyse prikker øverst for antall JA, mørke prikker nederst for antall NEI)
 * 
 * Dersom du har en NeoPixel-lyslenke, kan du koble den til P0 for å vise valgresultatet med farger.
 * 
 * "Ja" og "Nei" er satt til 3 og 6 i dette eksempelet for å teste lyslenken/skjermen. Dette endres til 0 når du trykker på A.
 */
let strip: neopixel.Strip = null
let neoPixelLengde = 0
let stemmeUrneÅpen = false
let nei = 0
let ja = 0
radio.setGroup(1)
basic.showIcon(IconNames.Happy)
ja = 8
nei = 3
stemmeUrneÅpen = false
// Endre dette tallet til antall lys på NeoPixel-lyslenken
neoPixelLengde = 10
strip = neopixel.create(DigitalPin.P0, neoPixelLengde, NeoPixelMode.RGB)
strip.clear()
