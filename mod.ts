import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

async function loadPlanetsData() {
  const path = join(".", "planets.csv")
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: '#',
  })
  console.log(result);
  Deno.close(file.rid)
}

await loadPlanetsData();