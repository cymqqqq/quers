"use strict";

class EndPoint {
    constructor(registry, broker, node) {
        this.registry = registry;
        this.broker = broker;

        this.id = node.id;
        this.node = node;

        this.local = node.id === broker.nodeID;
        this.state = true;
    }

    destory() {}

    get isAvailable() {
        return this.state;
    }

    update() {}
}

module.exports = EndPoint;