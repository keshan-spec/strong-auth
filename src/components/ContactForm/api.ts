export const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    // We need to map the data to the format that the Select component expects
    return data.map((country: any) => ({
        value: country.cca2,
        label: country.name.common,
    }));
}

export const fetchCountryCode = async (code: string) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await response.json();
    const idd = data[0]["idd"]

    return { code: idd.root + idd.suffixes[0], flag: data[0].flags["svg"] };
}