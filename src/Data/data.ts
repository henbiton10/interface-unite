export interface Dog {
    id: number;
    name: string;
    bark: string;
    food: string;
}

export interface Cat {
    id: number;
    name: string;
    meow: string;
    food: string;
    hobby: string;
}

export interface ShirBarak {
    id: number;
    protein: string;
    food: string;
    hobby: string;
}

export const dogs: Dog[] = [
    {
        id: 1,
        name: 'doggo',
        bark: 'woof',
        food: 'dogly',
    },
    {
        id: 2,
        name: 'naknikos',
        bark: 'hav',
        food: 'bonzo',
    },
    {
        id: 3,
        name: 'mbappe',
        bark: 'pendel',
        food: 'kaki',
    }
];

export const cats: Cat[] = [
    {
        id: 4,
        name: 'kitty',
        food: 'salmon',
        hobby: 'annoy',
        meow: 'meowwwww'
    },
    {
        id: 5,
        name: 'mitzi',
        food: 'milk',
        hobby: 'annoy',
        meow: 'meu'
    },
    {
        id: 6,
        name: 'menashe',
        food: 'salmon',
        hobby: 'annoy',
        meow: 'khhhhh'
    }
];

export const shirs: ShirBarak[] = [
    {
        id: 7,
        protein: 'a lot',
        food: 'beans',
        hobby: 'kosher'
    },
    {
        id: 8,
        protein: 'too much',
        food: 'tuna',
        hobby: 'train'
    },
    {
        id: 9,
        protein: 'yes',
        food: 'cottage chesse',
        hobby: 'mahon kosher'
    }
]