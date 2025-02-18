export default function generateCSV_URL(data: object[]): string {
  if (!data.length) {
    throw Error('No data array to CSV processing');
  }
  const content = generateCSVContent(data);

  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  return url;
}

function generateCSVContent(data: object[]): string {
  const headLine = Object.keys(data[0]).join(',') + '\n';
  const rows = data
    .map((elem) =>
      Object.values(elem)
        .map((val) => (typeof val === 'object' ? JSON.stringify(val) : val))
        .join(',')
    )
    .join('\n');
  return headLine + rows;
}
