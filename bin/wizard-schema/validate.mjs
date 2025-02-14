/**
 * USAGE FROM ROOT:
 *   nvm use
 *   npm ci
 *   node bin/wizard-schema/validate.mjs JSON_FILE
 */
import { z } from 'zod';
import fs from 'node:fs';

const filename = process.argv[2];
if (!filename) {
  throw new Error('You must provide a path to the JSON file to be validated.');
}

const obj = JSON.parse(fs.readFileSync(filename));

const schema = z.object({
  agency_mission_match: z.array(
    z.object({
      abbreviation: z.string(),
      id: z.string(),
      parent: z.null(),
      score: z.number(),
      title: z.string(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  agency_finder_predictions: z.array(
    z.object({
      abbreviation: z.string(),
      confidence_score: z.number(),
      id: z.string(),
      parent: z.nullable(
        z.object({
          abbreviation: z.string(),
          id: z.string(),
          name: z.string(),
          type: z.string(),
        }),
      ),
      title: z.string(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  agency_name_match: z.array(
    z.object({
      abbreviation: z.string(),
      id: z.string(),
      parent: z.null(),
      title: z.string(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  freqdoc_predictions: z.array(
    z.object({
      abbreviation: z.string(),
      component: z.string(),
      parent_abbreviation: z.nullable(z.string()),
      score: z.number(),
      title: z.string(),
      url: z.string(),
    }),
  ),
  predefined_flow: z.nullable(
    z.object({
      confidence_score: z.number(),
      flow: z.string().refine((str) => {
        const valids = [
          // Official flow topics
          'Immigration or Travel records',
          'Tax records',
          'Social Security records',
          'Medical records',
          'Personnel records',
          'Military records',
          'Law Enforcement records',

          // We accept and transform these in wizard_store.js submitRequest()
          'IRS records', // -> Tax records
          'Immigration records', // -> Immigration or Travel records
          'Travel records', // -> Immigration or Travel records
        ].map((topic) => topic.toUpperCase());
        return valids.includes(str.toUpperCase());
      }),
    }),
  ),
});

const result = schema.safeParse(obj);
if (result.success) {
  console.log(`✅ "${filename}" contains a valid wizard API response.`);
} else {
  console.error('Validation errors:', result.error.issues);
}
