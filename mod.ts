import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

interface Planet {
  [ key: string ]: string;
}
async function loadPlanetsData() {
  const path = join(".", "planets.csv")
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: '#',
  })
  Deno.close(file.rid)
  const planets = (result as Planet[]).filter((planet) => {
    const prad = Number(planet["koi_prad"])
    const smass = Number(planet['koi_smass'])
    const srad = Number(planet["koi_srad"])
    const confirmedDisposition = planet["koi_disposition"] === 'CONFIRMED';
    const similarRadious = prad > 0.5 && prad < 1.5;
    const similarMass = smass > 0.78 && smass < 1.04;
    const similarStellarRadious = srad > 0.99 && srad < 1.01;
    return confirmedDisposition && similarRadious && similarMass && similarStellarRadious;
  })
  return planets;
}

const planets = await loadPlanetsData();
console.log(`${planets.length} - amount of planets`);