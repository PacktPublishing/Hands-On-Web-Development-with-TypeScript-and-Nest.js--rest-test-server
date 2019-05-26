import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { CryptoCurrency } from './types';
import { CryptoCurrencyDto } from './dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from './dto/updateCryptoCurrency.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CryptoapiService {
    constructor(
        @InjectModel('Crypto') private readonly cryptoModel: Model<CryptoCurrency>,
        private readonly httpService: HttpService,
    ) { }

    async fetchAll() {
        return await this.cryptoModel.find().exec();
    }

    fetchEverything() {
        return this.httpService
            .get('http://jsonplaceholder.typicode.com/photos').toPromise();
    }

    async findOne(name: string) {
        return await this.cryptoModel.find({ name });
    }

    async addOne(newCrypto: CryptoCurrencyDto) {
        const addCrypto = new this.cryptoModel(newCrypto);
        // save data in database
        return await addCrypto.save();
    }

    async editOne(
        name: string,
        updatedCrypto: UpdateCryptoCurrencyDto,
    ) {
        await this.cryptoModel.deleteOne({ name });
        return await this.addOne(updatedCrypto);
    }

    async deleteOne(name: string) {
        return await this.cryptoModel.deleteOne({ name });
    }
}
