export const getContent = async (type: string) => {
  try {
    const res = await fetch(`https://swapi.dev/api/${type}/?format=json`);
    const { results } = await res.json();

    localStorage.setItem(type, JSON.stringify(results));
    return results;
  } catch {
    throw new Error('Error happen');
  }
};

export const getImageLink = (type: string, index: number) => {
  return `https://starwars-visualguide.com/assets/img/${type}/${index}.jpg`;
};
