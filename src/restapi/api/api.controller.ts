import { Controller, Get, Param, Header, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('api')
export class ApiController {
    cryptoCurrencies: Set<string> = new Set(['bitcoin', 'ethereum', 'litecoin', 'monero']);

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
        return { msg: this.cryptoCurrencies.has(name) ? 'Currency found' : 'Currency not found' };
    }

    // POST /api/add-crypto
    @Post('add-crypto')
    addOne(@Body('name') newCrypto: string) {
        this.cryptoCurrencies.add(newCrypto);
        return {
            msg: `Currency ${newCrypto} added`,
            list: [...this.cryptoCurrencies],
        };
    }

    // PUT /api/edit-crypto/:name
    @Put('edit-crypto/:name')
    editOne(@Param('name') name: string, @Body('newName') newName: string) {
        const updatedCryptos = [...this.cryptoCurrencies].filter(crypto => crypto !== name);
        updatedCryptos.push(`${newName} (ex ${name})`);

        this.cryptoCurrencies = new Set([...updatedCryptos]);
        return {
            msg: `Currency ${name} updated`,
            list: [...this.cryptoCurrencies],
        };
    }

    // DELETE /api/delete-crypto/:name
    @Delete('delete-crypto/:name')
    deleteOne(@Param('name') name: string) {
        const isFound = this.cryptoCurrencies.has(name);

        return isFound ? this.cryptoCurrencies.delete(name) &&
            // anonymous IIFE to return response
            (() => ({
                msg: `Currency ${name} removed`,
                list: [...this.cryptoCurrencies],
            }))()
            : (() => ({ msg: `Currency ${name} not found` }))();
    }
}
