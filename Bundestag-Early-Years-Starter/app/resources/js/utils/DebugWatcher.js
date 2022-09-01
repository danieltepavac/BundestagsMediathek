async function checkForChangesInClientCode(url) {
    let response = await fetch(url),
        result = await response.json();
    if (result.shouldReload) {
        location.reload();
    }
}

class DebugWatcher {

    #url;
    #tick;
    #interval;

    constructor(url = "/changes", tick = 3000) {
        this.#url = url;
        this.#tick = tick;
    }

    connect() {
        this.#interval = setInterval(checkForChangesInClientCode.bind(null, this.#url), this.#tick);
    }

    disconnect() {
        clearInterval(this.#interval);
    }
}

export default new DebugWatcher();