// porduct sort options
export const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];


// navbar navigation menus
export const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Help', href: '/help', current: false },
]

// navbar user navigation menus
export const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/orders' },
  { name: 'Sign out', link: '/logout' },
]
