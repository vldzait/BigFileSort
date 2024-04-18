const fs = require('fs');
const { sortFile } = require('./sort');

describe('sortFile', () => {
  it('should sort a file', async () => {
    const inputFile = 'test.txt';
    const outputFile = 'sorted_test.txt';

    await fs.promises.writeFile(inputFile, 'Car\nApple\nOrange\nBird\nTea\nFoot\nBall');
    await sortFile(inputFile, outputFile);
    const sortedFile = await fs.promises.readFile(outputFile, 'utf-8');
    
    expect(sortedFile).toBe('Apple\nBall\nBird\nCar\nFoot\nOrange\nTea\n');
  });
});