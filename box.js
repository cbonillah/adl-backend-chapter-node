module.exports = class Box {

	constructor(height, width, depth) {
		this._height = height
		this._width = width
		this._depth = depth
	}

	get width() { return this._width }
	get height() { return this._height }
	get depth() { return this._depth }

	get surfaceArea() {
		return (2 * this.width * this.height) + (2 * this.width * this.depth) + (2 * this.depth * this.height)
	}

	get volume() {
		return this.width * this.height * this.depth
	}

	expand() {
		this._height *= 1.5
		this._width *= 1.5
		this._depth *= 1.5
	}

	shrink() {
		this._height /= 1.5
		this._width /= 1.5
		this._depth /= 1.5
	}

}
