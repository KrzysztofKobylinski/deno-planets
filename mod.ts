async function readFile() {
  const data = await Deno.readTextFile("input.txt");
  console.log(data);
}

await readFile();