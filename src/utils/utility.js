export const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
];
  
export const filters = [
    {
      id: "brand",
      name: "Brands",
      options: [
        { value: 'Apple', label: 'Apple', checked: false },
        { value: 'Samsung', label: 'Samsung', checked: false },
        { value: 'OPPO', label: 'OPPO', checked: false },
        { value: 'Huawei', label: 'Huawei', checked: false },
        { value: 'Microsoft Surface', label: 'Microsoft Surface', checked: false},
        { value: 'Infinix', label: 'Infinix', checked: false },
        { value: 'HP Pavilion', label: 'HP Pavilion', checked: false },
        { value: 'Impression of Acqua Di Gio', label: 'Impression of Acqua Di Gio', checked: false },
        { value: 'Royal_Mirage', label: 'Royal_Mirage', checked: false },
        { value: 'Fog Scent Xpressio', label: 'Fog Scent Xpressio', checked: false},
        { value: 'Al Munakh', label: 'Al Munakh', checked: false },
        { value: 'Lord - Al-Rehab', label: 'Lord   Al Rehab', checked: false },
        { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
        { value: 'Hemani Tea', label: 'Hemani Tea', checked: false },
        { value: 'Dermive', label: 'Dermive', checked: false },
        { value: 'ROREC White Rice', label: 'ROREC White Rice', checked: false},
        { value: 'Fair & Clear', label: 'Fair & Clear', checked: false },
        { value: 'Saaf & Khaas', label: 'Saaf & Khaas', checked: false },
        { value: 'Bake Parlor Big', label: 'Bake Parlor Big', checked: false},
        { value: 'Baking Food Items', label: 'Baking Food Items', checked: false},
        { value: 'fauji', label: 'fauji', checked: false },
        { value: 'Dry Rose', label: 'Dry Rose', checked: false },
        { value: 'Boho Decor', label: 'Boho Decor', checked: false },
        { value: 'Flying Wooden', label: 'Flying Wooden', checked: false },
        { value: 'LED Lights', label: 'LED Lights', checked: false },
        { value: 'luxury palace', label: 'luxury palace', checked: false },
        { value: 'Golden', label: 'Golden', checked: false }
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "smartphones", label: "smartphones", checked: false },
        { value: "laptops", label: "laptops", checked: false },
        { value: "fragrances", label: "fragrances", checked: true },
        { value: "skincare", label: "skincare", checked: false },
        { value: "groceries", label: "groceries", checked: false },
        { value: "home-decoration", label: "home-decoration", checked: false },
      ],
    }
];