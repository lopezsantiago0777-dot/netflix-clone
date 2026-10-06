const img = (seed, w = 300, h = 450) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const featured = {
  title: 'Noche en la ciudad',
  description: 'Un detective retirado vuelve a su barrio y descubre un secreto que cambia todo.',
  bannerImg: img('banner1', 1600, 800),
};

export const categories = [
  {
    name: 'Acción',
    movies: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      id: `a${n}`, title: `Acción ${n}`, coverImg: img(`accion${n}`),
    })),
  },
  {
    name: 'Comedia',
    movies: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      id: `c${n}`, title: `Comedia ${n}`, coverImg: img(`comedia${n}`),
    })),
  },
  {
    name: 'Documentales',
    movies: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      id: `d${n}`, title: `Documental ${n}`, coverImg: img(`doc${n}`),
    })),
  },
];