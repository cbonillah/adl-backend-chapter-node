const { Circle, Triangle, Rectangle } = require('./figures')

const circle = new Circle(3)

console.log(`Circle radius: ${circle.radius}`)
console.log(`Circle diameter: ${circle.diameter}`)

console.log(`Circle area: ${circle.area}`)

const triangle = new Triangle(2, 4)

console.log(`Triangle base: ${triangle.base}`)
console.log(`Triangle height: ${triangle.height}`)

console.log(`Triangle area: ${triangle.area}`)

const rectangle = new Rectangle(2, 4)

console.log(`Rectangle width: ${rectangle.width}`)
console.log(`Rectangle height: ${rectangle.height}`)

console.log(`Rectangle area: ${rectangle.area}`)
