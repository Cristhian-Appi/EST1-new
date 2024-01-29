class Node {
    constructor(player, event_type, time) {
        this.player = player;
        this.event_type = event_type;
        this.time = time;
        this.next = null;
    }
}

class EventLinkedList {
    constructor() {
        this.head = null;
    }

    addEvent(player, event_type, time) {
        const newEvent = new Node(player, event_type, time);
        if (!this.head) {
            this.head = newEvent;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newEvent;
        }
    }

    displayEvents() {
        let current = this.head;
        while (current) {
            console.log(`${current.player} - ${current.event_type} at ${current.time} minutes`);
            current = current.next;
        }
    }
}

// Exemplo de uso:
const eventsList = new EventLinkedList();
eventsList.addEvent("PlayerA", "2-point shot", 5);
eventsList.addEvent("PlayerB", "Foul", 7);
eventsList.addEvent("PlayerA", "Assist", 8);
eventsList.displayEvents();


class SubstitutionQueue {
    constructor() {
        this.queue = [];
    }

    enqueueSubstitution(playerIn, playerOut) {
        this.queue.push({ playerIn, playerOut });
    }

    processSubstitutions() {
        while (this.queue.length > 0) {
            const { playerIn, playerOut } = this.queue.shift();
            console.log(`Substitution: ${playerIn} in, ${playerOut} out`);
        }
    }
}

// Exemplo de uso:
const substitutionQueue = new SubstitutionQueue();
substitutionQueue.enqueueSubstitution("PlayerC", "PlayerA");
substitutionQueue.enqueueSubstitution("PlayerD", "PlayerB");
substitutionQueue.processSubstitutions();



class StatsStack {
    constructor() {
        this.stack = [];
    }

    addStatistic(player, statType) {
        this.stack.push({ player, statType });
    }

    undoLastStatistic() {
        if (this.stack.length > 0) {
            const { player, statType } = this.stack.pop();
            console.log(`Undo last statistic: ${player} - ${statType}`);
        }
    }
}

// Exemplo de uso:
const statsStack = new StatsStack();
statsStack.addStatistic("PlayerA", "Points Scored: 2");
statsStack.addStatistic("PlayerB", "Assist");
statsStack.undoLastStatistic();