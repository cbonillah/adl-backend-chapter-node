const Box = require('./box')

const box = new Box(2, 3, 4)
console.log(`Box depth: ${box.depth}`)
console.log(`Box width: ${box.width}`)
console.log(`Box height: ${box.height}`)

console.log(`Box volume: ${box.volume}`)
console.log(`Box surface area: ${box.surfaceArea}`)

console.log('Expanding box...')
box.expand()
box.expand()

console.log(`New box depth: ${box.depth}`)
console.log(`New box width: ${box.width}`)
console.log(`New box height: ${box.height}`)

console.log(`New box volume: ${box.volume}`)
console.log(`New box surface area: ${box.surfaceArea}`)

console.log('Shrinking box...')
box.shrink()

console.log(`New box depth: ${box.depth}`)
console.log(`New box width: ${box.width}`)
console.log(`New box height: ${box.height}`)

console.log(`New box volume: ${box.volume}`)
console.log(`New box surface area: ${box.surfaceArea}`)
