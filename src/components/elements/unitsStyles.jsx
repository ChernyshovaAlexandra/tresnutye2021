import * as PIXI from 'pixi.js'

let wWidth = window.innerWidth

export const style = new PIXI.TextStyle({
    align: "center",
    fontFamily: "Junegull",
    fontSize: 18,
    //fontWeight: "bold",
    fill: ["#fff"],
});

export const headerStyle = new PIXI.TextStyle({
    align: "center",
    fontFamily: "Junegull",
    fontSize: 42,
    fontWeight: "bold",
    fill: ["#7400BB"]
});
export const descriptionStyle = new PIXI.TextStyle({
    fontFamily: "Golos",
    fontSize: 15,
    fontWeight: "400",
    fill: ["#7400BB"],
    lineHeight: wWidth > 780 ? 25 : 19,
    wordWrap: true,
    wordWrapWidth: wWidth > 780 ? 520 : 253
});
