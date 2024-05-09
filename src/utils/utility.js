// porduct sort options
export const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];


// navbar navigation menus
export const navigation = [
  { name: 'Home', link: '/', user: true },
  { name: 'About', link: '/about', user: true },
  { name: 'Help', link: '/help', user: true },
  { name: 'Admin', link: '/admin', admin: true },
]

// navbar user navigation menus
export const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/orders' },
  { name: 'Sign out', link: '/logout' },
]
