const { createClient } = require('next-sanity');

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-04',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

async function populateArtistProfile() {
  console.log('👩‍🎨 Creating artist profile document...');

  const artistProfile = {
    _type: 'artist',
    _id: 'jennifer-watkins',
    name: 'Jennifer Watkins',
    
    bio: 'Jennifer Watkins is a contemporary artist whose work explores the delicate balance between chaos and order, finding beauty in the unexpected intersections of color, form, and emotion. Born in San Francisco and currently based in Brooklyn, her multicultural background deeply influences her artistic perspective. Her practice encompasses painting, mixed media, and digital art, often combining traditional techniques with contemporary approaches. Watkins\' work has been described as "emotionally resonant" and "technically masterful" by critics, earning her recognition in both emerging and established art circles. Drawing inspiration from both natural landscapes and urban environments, Jennifer seeks to capture moments of transformation—those fleeting instances where light shifts, seasons change, or human experience crystallizes into something profound and universal.',

    shortBio: 'Contemporary artist based in Brooklyn, exploring the intersection of traditional techniques and modern expression through painting and mixed media.',

    statement: 'My work explores the delicate balance between chaos and order, finding beauty in the unexpected intersections of color, form, and emotion. Each piece begins as a conversation between my conscious intentions and the spontaneous discoveries that emerge through the creative process. Drawing inspiration from both the natural world and urban landscapes, I seek to capture moments of transformation—those fleeting instances where light shifts, seasons change, or human experience crystallizes into something profound and universal. Through a combination of traditional techniques and contemporary approaches, I invite viewers to pause, reflect, and discover their own narratives within the visual language I create.',

    aboutPageIntro: 'Exploring the boundaries between traditional artistry and contemporary expression, creating works that invite contemplation and emotional connection.',

    birthYear: 1992,
    nationality: 'American',
    
    location: {
      city: 'Brooklyn',
      country: 'United States',
    },

    activeSince: 2018,
    primaryMedium: 'Mixed Media',

    education: [
      {
        institution: 'Yale School of Art',
        degree: 'Master of Fine Arts',
        field: 'Contemporary Art Practice',
        startYear: 2016,
        endYear: 2018,
        location: {
          city: 'New Haven',
          country: 'United States',
        },
        description: 'Focused on mixed media and conceptual art practices',
      },
      {
        institution: 'Rhode Island School of Design',
        degree: 'Bachelor of Fine Arts',
        field: 'Painting and Drawing',
        startYear: 2012,
        endYear: 2016,
        location: {
          city: 'Providence',
          country: 'United States',
        },
        description: 'Magna Cum Laude, Dean\'s List',
      },
    ],

    careerTimeline: [
      {
        year: '2024',
        title: 'Current Studio Practice',
        description: 'Working from a converted warehouse studio in Brooklyn, focusing on large-scale mixed media works.',
      },
      {
        year: '2022',
        title: 'International Recognition',
        description: 'Featured in Artforum\'s "Artists to Watch" and acquired by the Whitney Museum.',
      },
      {
        year: '2020',
        title: 'First Solo Exhibition',
        description: 'Debut solo show "Liminal Spaces" at Gallery Modern, New York.',
      },
      {
        year: '2018',
        title: 'Graduate Studies Completed',
        description: 'Graduated from Yale School of Art with MFA in Contemporary Art Practice.',
      },
    ],

    exhibitions: [
      {
        title: 'Liminal Spaces',
        type: 'solo',
        venue: 'Gallery Modern',
        location: {
          city: 'New York',
          country: 'United States',
        },
        startDate: '2020-03-15',
        endDate: '2020-05-15',
        description: 'Debut solo exhibition exploring themes of transition and transformation.',
        isUpcoming: false,
        isFeatured: true,
      },
      {
        title: 'Emerging Voices',
        type: 'group',
        venue: 'Brooklyn Museum',
        location: {
          city: 'Brooklyn',
          country: 'United States',
        },
        startDate: '2021-09-01',
        endDate: '2021-12-01',
        description: 'Group exhibition featuring emerging contemporary artists.',
        isUpcoming: false,
        isFeatured: false,
      },
    ],

    awards: [
      {
        title: 'Emerging Artist Award',
        organization: 'New York Arts Foundation',
        year: 2021,
        description: 'Recognition for outstanding contribution to contemporary art.',
        category: 'Emerging Artist',
      },
      {
        title: 'Dean\'s List',
        organization: 'Rhode Island School of Design',
        year: 2016,
        description: 'Academic excellence in Fine Arts program.',
        category: 'Academic',
      },
    ],

    publications: [
      {
        title: 'Artists to Watch 2022',
        type: 'magazine',
        publisher: 'Artforum',
        year: 2022,
        authors: ['Sarah Johnson'],
        description: 'Feature article highlighting emerging contemporary artists.',
        url: 'https://artforum.com/artists-to-watch-2022',
      },
    ],

    collections: [
      'Whitney Museum of American Art',
      'Brooklyn Museum',
      'Private Collections (New York, Los Angeles, London)',
    ],

    socialMedia: {
      instagram: 'https://instagram.com/jenniferwatkinsart',
      facebook: 'https://facebook.com/jenniferwatkinsart',
      twitter: 'https://twitter.com/jwatkins_art',
    },

    contact: {
      email: 'hello@jenniferwatkins.art',
      phone: '+1 (555) 123-4567',
      website: 'https://jenniferwatkins.art',
    },

    isActive: true,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  };

  try {
    const result = await client.createOrReplace(artistProfile);
    console.log('✅ Artist profile created successfully:', result._id);
    return result;
  } catch (error) {
    console.error('❌ Error creating artist profile:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting artist profile population...');
    await populateArtistProfile();
    console.log('🎉 Artist profile population completed!');
  } catch (error) {
    console.error('💥 Population failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { populateArtistProfile };
