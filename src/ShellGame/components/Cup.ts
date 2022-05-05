import p5Types from "p5";

export const DrawCup = ( p5: p5Types, cup: Cup, text?: string ) => {
    const widthBottom = cup.width + ( 2 * cup.width *  0.0625 );
    const y = cup.y - cup.width * 0.75;
    p5.fill('#003142')
    p5.strokeWeight(4);
      p5.stroke('#003142');
    p5.beginShape();
    p5.vertex(cup.x + (cup.width * 0.5625), y + cup.width * 1.5) //bottom right
    p5.vertex(cup.x + cup.width/2, y) //top right
    p5.vertex(cup.x - cup.width/2, y); //top left
    p5.vertex(cup.x - (cup.width * 0.5625), y + cup.width * 1.5); //bottom left
    p5.endShape();
    p5.ellipse(cup.x, y, cup.width, cup.height);
    p5.arc(cup.x, y +  cup.width * 1.5, widthBottom, cup.height, 0, p5.PI);
    p5.fill(255)
    text && p5.text(text, cup.x, cup.y);
};

export interface Cup {
  x: number;
  y: number;
  width: number;
  height: number;
}