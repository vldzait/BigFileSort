const { sortFile } = require('./service/bigFileSort/sort');

const inputFile = 'large_file.txt'; // Путь к входному файлу
const outputFile = 'large_file_sorted.txt'; // Путь к выходному файлу

sortFile(inputFile, outputFile);