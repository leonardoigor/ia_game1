







class Player {
    constructor(brain) {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 20;
        this.state = 'stopped';
        this.speed = 15;
        this.fitness = 0
        this.optimizerfitness = 0
        this.score = 0
        this.time = 0
        this.nearFruit = { x: 0, y: 0 }
        setInterval(() => {
            this.time++
        }, 2000);
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetWorks(5, 2, 4);
        }
    }

    // brain

    mutate () {
        this.brain.mutate(0.1)
    }
    dispose () {
        this.brain.model.dispose();

    }
    think () {
        let fuitPos = this.getNearFruit()
        // console.log(fuitPos);
        this.nearFruit = fuitPos
        let inputs = []
        inputs[0] = this.y / height;
        inputs[1] = this.x / width;
        inputs[2] = this.time / 11;
        inputs[3] = fuitPos ? fuitPos.x / width : 0;
        inputs[4] = fuitPos ? fuitPos.y / height : 0;
        // inputs[5] = this.speed
        // console.log(inputs);
        let ouput = this.brain.predict(inputs)
        // console.log(ouput);
        if (ouput[0] > ouput[1]) {
            this.up()
        }
        if (ouput[0] < ouput[1]) {
            this.down()
        }
        if (ouput[2] < ouput[3]) {
            this.left()
        }
        if (ouput[2] > ouput[3]) {
            this.right()
        }
    }
    // 
    distance (o) {
        return {
            x: Math.abs(this.x - o.x),
            y: Math.abs(this.y - o.y)
        }
    }
    getNearFruit () {
        let dist = []
        fruit.fruits.forEach(r => {
            let res = this.CheckDistance(r)
            dist.push({ x: r.x, y: r.y, d: res })
        })
        // let closest = null;
        // let closestD = Infinity
        // for (let i = 0; i < fruit.fruits.length; i++) {
        //     let d = fruit.fruits[i].x + fruit.fruits[i].size - this.x;
        //     if (d < closestD && d > 0) {
        //         closest = fruit.fruits[i];
        //         closestD = d;
        //         // console.log(d);
        //     }
        // }
        let req = { x: Infinity, y: Infinity }
        dist.forEach(({ d: { x, y } }, index) => {
            if (x < req.x && y < req.y) {
                req = dist[index]
            }
        })
        return req
    }
    colider (fru) {
        let x = Math.abs((this.x) - (fru.x)) - (this.size) < 1
        let y = Math.abs((this.y) - (fru.y)) - (this.size) < 1

        return x && y
    }
    CheckDistance (item) {
        let x = Math.abs((this.x) - (item.x)) - (this.size)
        let y = Math.abs((this.y) - (item.y)) - (this.size)

        return { x, y }
    }
    coliderWall () {
        let x = this.x < 0 || this.x > width
        let y = this.y < 0 || this.y > height
        return x || y
    }
    plus () {
        this.size += (this.size * .02)
    }

    draw () {
        // this.score++;

        line(this.x, this.y, this.nearFruit.x, this.nearFruit.y)

        stroke(255);
        fill(255, 100);
        ellipse(this.x, this.y, this.size, this.size);
        this.think()
    }
    up () {
        if (this.y > 12) {
            this.y = this.y - this.speed
        }
        this.state = 'up'
    }
    down () {
        if (this.y < height - 12) {
            this.y = this.y + this.speed
        }
        this.state = 'down'
    }
    left () {
        if (this.x > 0) {
            this.x = this.x - this.speed

        }
        this.state = 'left'
    }
    right () {
        if (this.x < width) {
            this.x = this.x + this.speed

        }
        this.state = 'right'
    }
}