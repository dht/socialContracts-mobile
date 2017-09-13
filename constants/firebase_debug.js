export let data = {};

const database = {
	ref: (root) => {
		return new Ref([root]);
	}
}
const mainApp = {
    database: () => database
};

const storage = {};


const getRef = (ref) => {
	return new Promise(function (resolve, reject) {
		resolve(ref.value());
	});
}

class Ref {
	constructor(path) {
		this._path = path;
        this._cursor = null;
        this._callbacks = [];
        this._lastValue = null;

		this._createPath();
	}

	_createPath() {
		let cursor = data;

		this._path.forEach(path => {
            cursor[path] = cursor[path] || {_data: {}};
            cursor = cursor[path];
		})

        this._cursor = cursor;
	}

	_compare(json1, json2) {
		return JSON.stringify(json1) == JSON.stringify(json2);
	}

    _checkForChanges() {
		const after = this.value(),
			before = this._lastValue;

		// console.log('before, after ->', before, after, this._path);

		if (!this._compare(before, after)) {
			this._callbacks.forEach(callback => {
				callback.call(this, after);
			})
		}

        this._lastValue = this.value();
	}

	child(path) {
        return new Ref([...this._path, path]);
	}

	remove() {
		delete this._cursor['_data'];
        this._cursor['_data'] = null;
	}

	set(value) {
        this._cursor['_data'] = value;
	}

	value() {
		return this._cursor['_data'];
	}

	addCallback(callback) {
		this._callbacks.push(callback);

		if (this._callbacks.length === 1) {
			this._interval = setInterval(() => {
				this._checkForChanges();
			}, 900)
		}
	}

	clearCallbacks() {
        clearInterval(this._interval);
        this._callbacks = [];
	}
}

export const listen = (ref, callback) => {
    ref.addCallback(callback);
}

export {
	mainApp,
	storage,
	getRef,
};
