const { createClient } = require('next-sanity');

// Create comprehensive sample content for the portfolio
async function populateSampleContent() {
  console.log('🎨 Populating comprehensive sample content...');
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-06-04',
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });

  try {
    // 1. Create Artist Profile
    console.log('👩‍🎨 Creating artist profile...');
    const artist = await client.create({
      _type: 'artist',
      name: 'Jennifer Watkins',
      bio: 'Jennifer Watkins is a contemporary artist whose work explores the intersection of traditional painting techniques and modern digital expression. Born in 1985, she has spent over a decade developing a unique visual language that speaks to the complexities of modern life while honoring classical artistic traditions.\n\nHer paintings often feature bold color palettes and dynamic compositions that invite viewers to contemplate themes of identity, transformation, and the human experience. Through her art, Jennifer seeks to create bridges between the past and present, the analog and digital, the personal and universal.',
      statement: 'My artistic practice is rooted in the belief that art has the power to transform both creator and viewer. Each piece I create is an exploration of color, form, and emotion - a visual conversation about what it means to be human in our rapidly changing world.\n\nI draw inspiration from both classical masters and contemporary digital artists, seeking to find harmony between traditional techniques and modern sensibilities. My goal is to create works that are both visually striking and emotionally resonant, pieces that invite contemplation and spark meaningful dialogue.',
      shortBio: 'Contemporary artist exploring the intersection of traditional painting and modern expression through bold colors and dynamic compositions.',
      aboutPageIntro: 'Discover the artist behind the canvas and the inspiration that drives each creation',
      birthYear: 1985,
      nationality: 'American',
      location: {
        city: 'New York',
        country: 'United States'
      },
      activeSince: 2010,
      primaryMedium: 'Mixed Media on Canvas',
      careerTimeline: [
        {
          year: '2010',
          title: 'First Solo Exhibition',
          description: 'Debuted first solo show "Emerging Voices" at Gallery 42 in Brooklyn, featuring 15 original paintings exploring themes of urban identity.'
        },
        {
          year: '2015',
          title: 'International Recognition',
          description: 'Work featured in "Contemporary Visions" group exhibition in London, marking first international showing.'
        },
        {
          year: '2020',
          title: 'Digital Art Integration',
          description: 'Began incorporating digital elements into traditional paintings, developing signature mixed-media style.'
        },
        {
          year: '2023',
          title: 'Major Museum Acquisition',
          description: 'Three works acquired by the Metropolitan Museum of Art for their contemporary collection.'
        }
      ],
      education: [
        {
          institution: 'Rhode Island School of Design',
          degree: 'Master of Fine Arts',
          field: 'Painting',
          startYear: 2006,
          endYear: 2008,
          location: {
            city: 'Providence',
            country: 'United States'
          },
          description: 'Focused on contemporary painting techniques and art theory. Thesis work explored the relationship between color and emotion in abstract expressionism.'
        },
        {
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Arts',
          field: 'Fine Arts',
          startYear: 2002,
          endYear: 2006,
          location: {
            city: 'Berkeley',
            country: 'United States'
          },
          description: 'Comprehensive study of art history, studio practice, and contemporary art theory. Graduated summa cum laude.'
        }
      ],
      exhibitions: [
        {
          title: 'Reflections in Color',
          type: 'solo',
          venue: 'Modern Art Gallery NYC',
          location: {
            city: 'New York',
            country: 'United States'
          },
          startDate: '2024-03-15',
          endDate: '2024-05-15',
          description: 'A comprehensive survey of recent works exploring the emotional resonance of color in contemporary life.',
          isFeatured: true,
          isUpcoming: false
        },
        {
          title: 'Emerging Voices in Contemporary Art',
          type: 'group',
          venue: 'Whitney Museum',
          location: {
            city: 'New York',
            country: 'United States'
          },
          startDate: '2023-09-01',
          endDate: '2024-01-15',
          description: 'Group exhibition featuring 20 contemporary artists under 40, showcasing the future of American art.',
          curator: 'Dr. Sarah Mitchell',
          isFeatured: true,
          isUpcoming: false
        }
      ],
      awards: [
        {
          title: 'Emerging Artist Award',
          organization: 'National Arts Foundation',
          year: 2022,
          description: 'Recognized for outstanding contribution to contemporary painting and innovative use of mixed media.',
          category: 'Visual Arts'
        },
        {
          title: 'Excellence in Contemporary Art',
          organization: 'New York Art Critics Circle',
          year: 2021,
          description: 'Awarded for exceptional artistic vision and technical mastery in the exhibition "Urban Landscapes".',
          category: 'Painting'
        }
      ],
      publications: [
        {
          title: 'Contemporary Painters Today',
          type: 'magazine',
          publisher: 'Art Monthly',
          year: 2023,
          authors: ['Michael Chen', 'Lisa Rodriguez'],
          description: 'Feature article highlighting innovative techniques in contemporary painting, with Jennifer\'s work prominently featured.',
          url: 'https://artmonthly.com/contemporary-painters-2023'
        }
      ],
      collections: [
        'Metropolitan Museum of Art, New York',
        'Museum of Contemporary Art, Los Angeles',
        'Private Collection of the Johnson Family Foundation'
      ],
      socialMedia: {
        instagram: 'https://instagram.com/jenniferwatkinsart',
        facebook: 'https://facebook.com/jenniferwatkinsartist',
        linkedin: 'https://linkedin.com/in/jenniferwatkins'
      },
      contact: {
        email: 'jennifer@jenniferwatkinsart.com',
        phone: '+1 (555) 123-4567',
        website: 'https://jenniferwatkinsart.com'
      },
      isActive: true
    });

    console.log('✅ Artist profile created:', artist._id);

    // 2. Create Portfolio Settings
    console.log('⚙️ Creating portfolio settings...');
    const portfolioSettings = await client.create({
      _type: 'portfolioSettings',
      _id: 'portfolioSettings',
      title: 'Jennifer Watkins Art Portfolio',
      description: 'Contemporary art portfolio showcasing original paintings and mixed media works that explore the intersection of traditional techniques and modern expression.',
      primaryArtist: {
        _type: 'reference',
        _ref: artist._id
      },
      heroSection: {
        title: 'Welcome to Jennifer Watkins Art',
        subtitle: 'Contemporary Abstract Expressionism',
        description: 'Explore a curated collection of contemporary artworks that bridge traditional painting techniques with modern digital expression. Each piece tells a story of color, emotion, and the human experience.',
        ctaText: 'Explore Gallery',
        ctaLink: '/portfolio',
        secondaryCtaText: 'About the Artist',
        secondaryCtaLink: '/about'
      },
      galleryTransition: {
        title: 'Enter the Gallery',
        subtitle: 'Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression. Each piece invites you to contemplate themes of identity, transformation, and the beauty found in everyday moments.'
      },
      artistStatement: {
        title: 'Artist Statement',
        quote: 'Art is not what you see, but what you make others see.',
        paragraphs: [
          'My artistic practice is rooted in the belief that art has the power to transform both creator and viewer. Each piece I create is an exploration of color, form, and emotion - a visual conversation about what it means to be human in our rapidly changing world.',
          'I draw inspiration from both classical masters and contemporary digital artists, seeking to find harmony between traditional techniques and modern sensibilities. Through bold color palettes and dynamic compositions, I aim to create works that are both visually striking and emotionally resonant.',
          'My goal is to create pieces that invite contemplation and spark meaningful dialogue about our shared human experience.'
        ],
        achievements: {
          artworksCount: 127,
          exhibitionsCount: 18,
          awardsCount: 5
        }
      },
      galleryTransition2: {
        title: 'Continue Exploring',
        subtitle: 'Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities. Each piece represents a unique moment in the ongoing dialogue between artist and canvas.'
      },
      socialMedia: {
        instagram: 'https://instagram.com/jenniferwatkinsart',
        facebook: 'https://facebook.com/jenniferwatkinsartist',
        linkedin: 'https://linkedin.com/in/jenniferwatkins'
      },
      contact: {
        email: 'jennifer@jenniferwatkinsart.com',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Art District Avenue',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States'
        }
      },
      ecommerce: {
        currency: 'USD',
        taxRate: 8.25,
        shippingRates: {
          domestic: 25,
          international: 75,
          freeShippingThreshold: 500
        },
        paymentMethods: ['credit-card', 'paypal', 'bank-transfer']
      },
      seo: {
        metaTitle: 'Jennifer Watkins Art - Contemporary Paintings & Mixed Media',
        metaDescription: 'Discover contemporary art by Jennifer Watkins. Original paintings and mixed media works exploring traditional techniques with modern expression.',
        keywords: ['contemporary art', 'abstract painting', 'mixed media', 'Jennifer Watkins', 'modern art', 'original paintings']
      }
    });

    console.log('✅ Portfolio settings created:', portfolioSettings._id);

    console.log('\n🎉 Sample content created successfully!');
    console.log('📍 Next steps:');
    console.log('1. Visit http://localhost:3000/studio to see your content');
    console.log('2. Add artwork images and create artwork entries');
    console.log('3. Customize the content to match your actual portfolio');
    console.log('4. Test the visual editing in presentation mode');
    
  } catch (error) {
    console.error('❌ Failed to create content:', error.message);
    if (error.message.includes('token')) {
      console.log('\n💡 Make sure SANITY_API_READ_TOKEN is set in your .env.local file');
      console.log('Get your token from: https://sanity.io/manage');
    }
  }
}

populateSampleContent();
