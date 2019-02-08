class Rectangle {
	constructor(width, height) {
		this._width = width
		this._height = height
	}

	get width() { return this._width }
	get height() { return this._height }

	get area() { return this._width * this._height }

}

class Circle {
	constructor(radius) {
		this._radius = radius
	}

	get radius() { return this._radius }
	get diameter() { return this._radius * 2 }

	get area() { return Math.PI * Math.pow(this._radius, 2) }

}

class Triangle {
	constructor(base, height) {
		this._height = height
		this._base = base
	}

	get height() { return this._height }
	get base() { return this._base }

	get area() { return (this._height * this._base) / 2 }
}

module.exports = {
	Rectangle,
	Circle,
	Triangle
}