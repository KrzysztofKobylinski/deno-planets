import { join } from "https://deno.land/std/path/mod.ts";

async function readFile() {
  const path = join("text_files", "input.txt")
  const data = await Deno.readTextFile(path);
  console.log(data);
}

await readFile();