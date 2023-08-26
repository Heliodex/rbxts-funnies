import fs from "fs"
import { compile } from "@danielx/civet"

// Recursively compile all civet files in ./src and rename their extensions to .ts
// const tsCode = compile(civetCode)

console.log("compiling")

const walk = dir => {
	let results = []
	for (let file of fs.readdirSync(dir)) {
		file = `${dir}/${file}`
		const stat = fs.statSync(file)
		if (stat && stat.isDirectory())
			/* Recurse into a subdirectory */
			results = results.concat(walk(file))
		/* Is a file */ else results.push(file)
	}
	return results
}

for (const file of walk("./src"))
	if (file.endsWith(".civet"))
		fs.writeFileSync(
			file.replace(".civet", ".ts"),
			compile(fs.readFileSync(file, "utf8"), {
				parseOptions: {
					
				}
			}),
		)

console.log("done")
