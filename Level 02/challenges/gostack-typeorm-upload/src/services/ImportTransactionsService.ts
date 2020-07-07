import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import CreateTransactionService from './DeleteTransactionService';

class ImportTransactionsService {
  async execute(): Promise<Transaction[]> {
    // async execute(): Promise<void> {
    // TODO
    const createTransaction = new CreateTransactionService();
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

    const lines = [];

    parseCSV.on('data', line => {
      const newTransaction = {
        title: line[0],
        type: line[1],
        value: line[2],
        category: line[3],
      };
      lines.push(newTransaction);
    });
    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    console.log(lines);
    return lines;
  }
}

export default ImportTransactionsService;
