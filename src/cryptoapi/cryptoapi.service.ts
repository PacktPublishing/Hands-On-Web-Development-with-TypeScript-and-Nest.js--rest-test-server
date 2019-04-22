import { Injectable } from '@nestjs/common';
import { CryptoCurrency } from './types';
import { CryptoCurrencyDto } from './dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from './dto/updateCryptoCurrency.dto';

@Injectable()
export class CryptoapiService {
    private readonly cryptoCurrencies: Set<CryptoCurrency> = new Set([
        { name: 'bitcoin', amount: 12 },
        { name: 'ethereum', amount: 23 },
        { name: 'litecoin', amount: 34 },
        { name: 'monero', amount: 45 },
    ]);

    fetchAll() {
        return {
            msg: 'All available currencies',
            list: [...this.cryptoCurrencies],
        };
    }

    findOne(name: string) {
        const isFound = [...this.cryptoCurrencies].some(
            crypto => crypto.name === name,
        );

        return {
            msg: isFound ? 'Currency found' : 'Currency not found',
            // conditional property
            ...(isFound && {
                result: [...this.cryptoCurrencies].find(
                    crypto => crypto.name === name,
                ),
            }),
        };
    }

    addOne(newCrypto: CryptoCurrencyDto) {
        const isFound = [...this.cryptoCurrencies].some(
            crypto => crypto.name === newCrypto.name,
        );

        if (!isFound) {
            this.cryptoCurrencies.add(newCrypto);
            return {
                msg: `Currency ${newCrypto.name} added`,
                list: [...this.cryptoCurrencies],
            };
        }

        return { msg: `Currency ${newCrypto.name} already exists` };
    }

    editOne(
        name: string,
        updatedCrypto: UpdateCryptoCurrencyDto,
    ) {
        const isFound = [...this.cryptoCurrencies].some(
            crypto => crypto.name === name,
        );

        if (isFound) {
            const updatedCryptos = [...this.cryptoCurrencies].filter(
                crypto => crypto.name !== name,
            );
            updatedCryptos.push(updatedCrypto);

            // update the cryptoCurrencies set
            this.cryptoCurrencies.clear();
            [...updatedCryptos].forEach(crypto => {
                return this.cryptoCurrencies.add(crypto);
            });

            return {
                msg: `Currency ${name} updated${
                    updatedCrypto.name !== name
                        ? ' to ' + updatedCrypto.name
                        : ''
                    }`,
                list: [...this.cryptoCurrencies],
            };
        }

        return { msg: `Currency ${name} not found` };
    }

    deleteOne(name: string) {
        const isFound = [...this.cryptoCurrencies].some(
            crypto => crypto.name === name,
        );

        if (isFound) {
            const updatedCryptos = [...this.cryptoCurrencies].filter(
                crypto => crypto.name !== name,
            );

            // update the cryptoCurrencies set
            this.cryptoCurrencies.clear();
            [...updatedCryptos].forEach(crypto => {
                return this.cryptoCurrencies.add(crypto);
            });

            return {
                msg: `Currency ${name} removed`,
                list: [...this.cryptoCurrencies],
            };
        }

        return { msg: `Currency ${name} not found` };
    }
}
