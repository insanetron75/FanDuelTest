import shuffle from '../../functions/shuffle'

describe('Shuffle Function', () => {
    it('shuffles the array', () => {
        const results  = shuffle([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ]);

        expect(results[0]).not.toEqual(1);

    });
})