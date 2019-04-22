import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CryptoCurrencyDto } from './dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from './dto/updateCryptoCurrency.dto';
import { CryptoapiService } from './cryptoapi.service';

@Controller('cryptoapi')
export class CryptoapiController {

    constructor(private readonly cryptoapiService: CryptoapiService) { }

    // GET /api
    @Get()
    // @Header('Content-Type', 'application/text')
    fetchAll() {
        return this.cryptoapiService.fetchAll();
    }

    // GET /api/find/:name
    @Get('find/:name')
    findOne(@Param('name') name: string) {
        return this.cryptoapiService.findOne(name);
    }

    // POST /api/add-crypto
    @Post('add-crypto')
    addOne(@Body() newCrypto: CryptoCurrencyDto) {
        return this.cryptoapiService.addOne(newCrypto);
    }

    // PUT /api/edit-crypto/:name
    @Put('edit-crypto/:name')
    editOne(
        @Param('name') name: string,
        @Body() updatedCrypto: UpdateCryptoCurrencyDto,
    ) {
        return this.cryptoapiService.editOne(name, updatedCrypto);
    }

    // DELETE /api/delete-crypto/:name
    @Delete('delete-crypto/:name')
    deleteOne(@Param('name') name: string) {
        return this.cryptoapiService.deleteOne(name);
    }
}
