export const SUBSCRIPTION_DATA = [
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    logo: '🎥', // You can replace these with actual image URLs or SVGs
    plans: [
      { id: 'n_basic', name: 'Basic (720p)', price: 199 },
      { id: 'n_standard', name: 'Standard (1080p)', price: 499 },
      { id: 'n_premium', name: 'Premium (4K)', price: 999 },
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Music',
    logo: '🎵',
    plans: [
      { id: 's_individual', name: 'Individual', price: 10.99 },
      { id: 's_duo', name: 'Duo', price: 14.99 },
      { id: 's_family', name: 'Family', price: 16.99 },
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    category: 'Productivity',
    logo: '🎨',
    plans: [
      { id: 'a_photo', name: 'Photography', price: 19.99 },
      { id: 'a_all', name: 'All Apps', price: 54.99 },
    ]
  }
];

export const CATEGORIES = ['All', 'Entertainment', 'Music', 'Productivity'];

