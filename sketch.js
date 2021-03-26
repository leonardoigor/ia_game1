
let player;
let fruit;
let items = [];
const TOTAL = 10;
var gene = 0
var w, y = 0
w = document.body.clientWidth
h = document.body.scrollHeight
let saveitems = [];
var maxScore = 0

function setup () {
  createCanvas(w, h);

  fruit = new Fruit()
  for (let i = 0; i < TOTAL; i++) {

    items.push(new Player())
  }

  // for (let i = 0; i < 50; i++) {
  // }
  fruit.add()
  fruit.add()
  fruit.add()
  fruit.add()
  fruit.add()
  fruit.add()
  fruit.add()
  fruit.add()
  fruit.add()

}

function draw () {
  background(0);
  tf.setBackend('cpu');

  let player1 = items.sort((a, b) => a.score > b.score)[0];
  if (player1) {

    fill('white');
    text(player1.state, 0, 10);

    text('fruit X', 80, 10);
    text(player1.nearFruit ? player1.nearFruit?.x / width : 0, 130, 10);


    text('fruit Y', 80, 22);
    text(player1.nearFruit ? player1.nearFruit?.y / height : 0, 130, 22);

    text('time', 80, 35);
    text(player1.time / 11, 130, 35);

    text('A.I S', 80, 50);
    text(items.length, 130, 50);


    text('generation ', 80, 65);
    text(gene, 140, 65);

    text('Score ', 80, 80);
    text(player1.score, 140, 80);

    text('Size ', 80, 95);
    text(player1.size, 140, 95);

    text('fitness ', 200, 80);
    text(player1.fitness, 280, 80);

    text('NearFruit ', 200, 120);
    text('x: ' + player1.nearFruit.x + ', y: ' + player1.nearFruit.y, 280, 120);


    text('MaxScore ' + maxScore,
      10, 120);


  }

  if (maxScore === undefined) maxScore = 0
  fruit.draw()
  items.forEach((player, i) => {
    player.draw()

    if (player.time > 10) {
      saveitems.push(items.splice(i, 1));
    }
  })
  if (items.length === 0) nextGeneration()




}










async function keyPressed () {
  if (key == ' ') {
    items[0].up();
    //console.log("SPACE");
  } if (key == 's') {
    await items[0].brain.model.save('localstorage://my-model-1');
    //console.log("SPACE");
  }
  if (key == 'w') {
    items[0].brain.model = await tf.loadLayersModel('localstorage://my-model-1');
    alert('loaded')
    items[0].think()
  }
}







class Fruit {
  constructor() {
    this.fruits = []
  }
  add () {
    this.fruits.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 20
    })
  }
  draw () {
    this.fruits.forEach((r, i) => {
      stroke('blue');
      fill('red');

      ellipse(r.x, r.y, r.size, r.size);
      items.forEach(player => {
        if (player.colider(r)) {
          this.fruits.splice(i, 1)
          player.plus()
          this.add()
          player.score += 500
          player.time = 0
        }
      })
    })
  }
}
document.body.addEventListener('keydown', function (val) {
  let key2 = val.key
  let player = items[0]
  switch (key2) {
    case 'w':
      player.up()
      break;
    case 's':
      player.down()
      break;
    case 'a':
      player.left()
      break;
    case 'd':
      player.right()
      break;

    default:
      break;
  }
})
