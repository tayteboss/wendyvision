const sanityClient = require('@sanity/client');
const fs = require('fs');

const client = sanityClient.createClient({
    projectId: 'xxx',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-10-24',
});

const getSiteData = async () => {
    const query = `
    *[_type == "siteSettings"][0] {
        footerConsultationCta,
      instagramUrl,
      linkedInUrl,
      tagline,
      twitterUrl,
      footerConsultationButtonTitle,
      footerConsultationButtonUrl,
      mobileMenuConsultationCta,
      mobileMenuConsultationButtonTitle,
    }
  `;

    try {
        const data = await client.fetch(query);
        const path = 'json';
        const file = 'siteSettings.json';
        const jsonData = JSON.stringify(data);

        fs.writeFile(`${path}/${file}`, jsonData, 'utf8', () => {
            console.log(`Wrote ${file} file.`);
        });

        return data;
    } catch (error) {
        console.error('Error fetching site data:', error);
        return [];
    }
};

module.exports = {
    getSiteData,
};
