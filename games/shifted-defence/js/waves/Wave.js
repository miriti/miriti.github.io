define([], function () {
    var Wave = function () {
        this.done = false;
        this.sequence = [];
        this.entities = [];
        this.current = 0;

    };

    Wave.prototype.add = function (type, amount) {

        var data = {
            type: type,
            amount: amount,
            done: 0,
            time: 0
        };

        this.sequence.push(data);

    };

    Wave.prototype.get = function () {
        return this.sequence;

    };


    Wave.prototype.isAllDead = function() {

        for(var entityId in this.entities) {
            var entity = this.entities[entityId];
            if (entity.health > 0) {
                return false;
            }

        }

        return true;
        
    }

    Wave.prototype.isDoneSpawning = function () {
        if (this.done) {
            return true;
        }

        for (var sequenceId in this.sequence) {
            var sequence = this.sequence[sequenceId];

            if (sequence.done < sequence.amount) {
                return false;

            }

        }

        this.done = true;
        return true;

    };

    Wave.prototype.update = function (map, delta, delayBetweenWaves) {
        if (!this.isDoneSpawning()) {

            for (var sequenceId in this.sequence) {
                sequenceId = parseInt(sequenceId);
                var sequence = this.sequence[sequenceId];

                if(sequenceId == this.current) {

                    if (sequence.time < delayBetweenWaves) {
                        this.sequence[sequenceId].time += delta;
                    }
                    else {
                        if (sequence.done < sequence.amount) {

                            for (var j = 0; j < sequence.amount; j++) {
                                var randomX = Math.random() > 0.5 ? Math.random() * -5 - 5 : Math.random() * 5 + 5;
                                var randomY = Math.random() > 0.5 ? Math.random() * -5 - 5 : Math.random() * 5 + 5;

                                var check = map.spawn(randomX, randomY, sequence.type);
                                this.sequence[sequenceId].done += 1;

                                this.entities.push(check);

                            }

                            this.current ++;

                        }

                    }

                }


            }

        }

    };

    return Wave;
});