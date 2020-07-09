import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import uploadConfig from '../config/uploadConfig';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    // async execute(): Promise<void> {
    // TODO
    const csvFilePath = path.resolve(
      __dirname,
      '..',
      '__tests__',
      'import_template.csv',
    );

    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Transaction[] = [];

    parseCSV.on('data', line => {
      const newTransaction = {
        title: line[0],
        type: line[1],
        value: line[2],
        category: line[3],
      };
      console.log(newTransaction);
    });
    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return lines;
  }
}

export default ImportTransactionsService;
