const crypto = require('crypto')

const startTime = Date.now()

const passwordsToProcess = [
	{ password: 'admin123', salt: 'salt' },
	{ password: 'secret', salt: 'tlas' }
]

passwordsToProcess.forEach((password, index) => {
	crypto.pbkdf2Sync(password.password, password.salt, 10000, 512, 'sha512')
	console.log(`Processed password number ${index+1} at ${Date.now() - startTime} ms`)
})

