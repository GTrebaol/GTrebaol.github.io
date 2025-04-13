const brands = {
  acebos: {
    name: "Acebos",
    description: "Chaussures de qualité pour enfants",
    logo: "/images/brands/acebos-logo.png"
  },
  bellamy: {
    name: "Bellamy",
    description: "Chaussures élégantes et confortables",
    logo: "/images/brands/bellamy-logo.png"
  },
  norvik: {
    name: "Norvik",
    description: "Chaussures sportives pour enfants",
    logo: "/images/brands/norvik-logo.png"
  }
};

const products = [
  {
    id: 1,
    brand: "bellamy",
    name: "Lami à velcro",
    price: 0,
    image: "/images/products/bellamy/lami-velcro.jpg",
    description: "Chaussure en cuir noir avec empiècement nubuck noir. Détails élégants en cuir blanc sur le côté et languette en cuir vert pour une touche de couleur.",
    sizes: ["32", "33", "34"],
    colors: ["Noir"],
    materials: ["Cuir", "Nubuck"],
    type: "Ville",
    ageRange: "Enfant",
    gender: "Unisexe",
    stock: {
      "32": { "Noir": 5 },
      "33": { "Noir": 5 },
      "34": { "Noir": 5 }
    },
    features: [
      "Fermeture à velcro",
      "Semelle antidérapante",
      "Doublure intérieure confortable"
    ],
    highlights: [
      "Cuir de qualité",
      "Design élégant avec détails contrastés",
      "Facile à enfiler grâce au velcro"
    ],
    tags: ["ville", "cuir", "velcro", "unisexe"]
  }
];

export { brands, products }; 