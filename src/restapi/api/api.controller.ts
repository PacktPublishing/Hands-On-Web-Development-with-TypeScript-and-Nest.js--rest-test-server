import { Controller, Get, Param, Header, Post, Body, Put, Delete } from '@nestjs/common';
import { CryptoCurrency as CryptoCurrencyDto, CryptoCurrency } from '../dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from '../dto/updateCryptoCurrency.dto';

@Controller('api')
export class ApiController {
    private readonly cryptoCurrencies: Set<CryptoCurrencyDto> = new Set([
        { name: 'bitcoin', amount: 12 },
        { name: 'ethereum', amount: 23 },
        { name: 'litecoin', amount: 34 },
        { name: 'monero', amount: 45 },
    ]);

    // GET /api
    @Get()
    // @Header('Content-Type', 'application/text')
    fetchAll() {
        return {
            msg: 'All available currencies',
            list: [...this.cryptoCurrencies],
        };
    }

    // GET /api/find/:index
    @Get('find/:name')
    findOne(@Param('name') name: string) {
        const isFound = [...this.cryptoCurrencies].some(crypto => crypto.name === name);

        return {
            msg: isFound ? 'Currency found' : 'Currency not found',
            // conditional property
            ...(isFound && {
                result: [...this.cryptoCurrencies].find(crypto => crypto.name === name),
            }),
        };
    }

    // POST /api/add-crypto
    @Post('add-crypto')
    addOne(@Body() newCrypto: CryptoCurrencyDto) {
        const isFound = [...this.cryptoCurrencies].some(crypto => crypto.name === newCrypto.name);

        if (!isFound) {
            this.cryptoCurrencies.add(newCrypto);
            return {
                msg: `Currency ${newCrypto.name} added`,
                list: [...this.cryptoCurrencies],
            };
        }

        return { msg: `Currency ${newCrypto.name} already exists` };
    }

    // PUT /api/edit-crypto/:name
    @Put('edit-crypto/:name')
    editOne(@Param('name') name: string, @Body() updatedCrypto: UpdateCryptoCurrencyDto) {
        const isFound = [...this.cryptoCurrencies].some(
            crypto => crypto.name === name,
        );

        if (isFound) {
            const updatedCryptos = [...this.cryptoCurrencies].filter(crypto => crypto.name !== name);
            updatedCryptos.push(updatedCrypto);

            // update the cryptoCurrencies set
            this.cryptoCurrencies.clear();
            [...updatedCryptos].forEach(crypto => {
                return this.cryptoCurrencies.add(crypto);
            });

            return {
                msg: `Currency ${name} updated${updatedCrypto.name !== name ? ' to ' + updatedCrypto.name : ''}`,
                list: [...this.cryptoCurrencies],
            };
        }

        return { msg: `Currency ${name} not found` };
    }

    // DELETE /api/delete-crypto/:name
    @Delete('delete-crypto/:name')
    deleteOne(@Param('name') name: string) {
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
