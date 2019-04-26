import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, BadRequestException } from '@nestjs/common';
import { CryptoCurrencyDto } from './dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from './dto/updateCryptoCurrency.dto';
import { CryptoapiService } from './cryptoapi.service';
import { HttpExceptionFilter } from 'src/Filters/http-exception.filter';

@Controller('cryptoapi')
export class CryptoapiController {
    constructor(private readonly cryptoapiService: CryptoapiService) { }

    // GET /api
    @Get()
    @UseFilters(HttpExceptionFilter)
    fetchAll() {
        return this.cryptoapiService.fetchAll();
    }

    // GET /api/find/:name
    @Get('find/:name')
    @UseFilters(HttpExceptionFilter)
    findOne(@Param('name') name: string) {
        return name.length >= 2
            ? this.cryptoapiService.findOne(name)
            : (
                () => {
                    throw new BadRequestException('Cryptocurrency name should be at least two characters');
                }
            )();
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
