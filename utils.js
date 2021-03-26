function nextGeneration () {
    gene++
    console.log('generation', gene, 'next generation', gene + 1);

    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
        // console.log(saveitems[i]);
        items[i] = pickOne();
    }
    for (let i = 0; i < TOTAL; i++) {
        saveitems[i][0].dispose();
    }
    saveitems = [];
}

function pickOne () {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        // console.log(saveitems[index]);
        r = r - saveitems[index][0].fitness;
        index++;
    }
    index--;
    let bird = saveitems[index][0];
    // console.log(bird);
    let child = new Player(bird.brain);
    child.fitness = bird.fitness ? bird.fitness : 0
    child.mutate();
    return child;
}

function calculateFitness () {
    let sum = 0;
    for (let bird of saveitems) {

        let b = bird[0].score
        if (b > maxScore) {
            maxScore = b
            b.score *= 100
        }
        sum += b;
    }
    for (let bird of saveitems) {
        bird[0].fitness = bird[0].score / sum;
        // console.log(bird[0].fitness, bird[0].score, sum);
    }
}
