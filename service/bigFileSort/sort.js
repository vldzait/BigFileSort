const fs = require('fs');
const readline = require('readline');

const SETTINGS = {
  'bufferSize': 500 * 1024 * 1024, // Размер буфера 500 МБ
  'bufferLength': Math.floor(this.bufferSize / 100), // Количество строк в буфере
}

/**
 * Сортировка большого файла состоящего из строк 
 * путем потоковой сортировки 
 * @param {string} inputFile - Путь к исходному файлу
 * @param {string} outputFile - Путь к отсортированному файлу
 */
async function sortFile(inputFile, outputFile) {
  fs.writeFile(outputFile, '', function(){})
  const inputStream = fs.createReadStream(inputFile);
  const lineReader = readline.createInterface({
    input: inputStream,
  });
  const outputStream = fs.createWriteStream(outputFile);

  const buffer = [];
  let isBufferFull = false;

  for await (const line of lineReader) {
    buffer.push(line);

    if (buffer.length >= SETTINGS.bufferLength) {
      isBufferFull = true;
    }

    if (isBufferFull) {
      buffer.sort();

      for (const line of buffer) {
        await outputStream.write(line + '\n');
      }

      buffer.length = 0;
      isBufferFull = false;
    }
  }

  buffer.sort();

  for (const line of buffer) {
    await outputStream.write(line + '\n');
  }

  outputStream.end();
}

module.exports = { sortFile };