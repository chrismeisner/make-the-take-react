import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

export const fetchTakes = async () => {
  const records = await base('Takes')
	.select({
	  maxRecords: 100,
	  view: 'Grid view',
	})
	.all();

  return records.map((record) => ({
	id: record.id,
	take: record.fields.Take,
	author: record.fields.Author || 'Anonymous',
	status: record.fields.Status || null,
  }));
};
