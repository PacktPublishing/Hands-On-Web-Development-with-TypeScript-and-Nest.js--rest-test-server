import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, BadRequestException, UsePipes, UseGuards } from '@nestjs/common';
import { CryptoCurrencyDto } from './dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from './dto/updateCryptoCurrency.dto';
import { CryptoapiService } from './cryptoapi.service';
import { CustomHttpExceptionFilter } from './filters/custom-http-exception.filter';
import { NameValidationPipe } from './pipes/name-validation.pipe';
import { CryptoDtoValidationPipe } from './pipes/crypto-dto-validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('cryptoapi')
export class CryptoapiController {
    constructor(private readonly cryptoapiService: CryptoapiService) { }

    // GET /cryptoapi
    @Get()
    @UseFilters(CustomHttpExceptionFilter)
    @UseGuards(AuthGuard('bearer'))
    fetchAll() {
        return this.cryptoapiService.fetchAll();
    }

    // GET /cryptoapi/everything
    @Get('everything')
    async fetchEverything() {
        return (await this.cryptoapiService.fetchEverything()).data;
    }

    // GET /cryptoapi/find/:name
    @Get('find/:name')
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(NameValidationPipe)
    findOne(@Param('name') name: string) {
        return this.cryptoapiService.findOne(name);
    }

    // POST /cryptoapi/add-crypto
    @Post('add-crypto')
    addOne(
        @Body() newCrypto: CryptoCurrencyDto,
    ) {
        return this.cryptoapiService.addOne(newCrypto);
    }

    // PUT /cryptoapi/edit-crypto/:name
    @Put('edit-crypto/:name')
    editOne(
        @Param('name') name: string,
        @Body() updatedCrypto: UpdateCryptoCurrencyDto,
    ) {
        return this.cryptoapiService.editOne(name, updatedCrypto);
    }

    // DELETE /cryptoapi/delete-crypto/:name
    @Delete('delete-crypto/:name')
    deleteOne(@Param('name') name: string) {
        return this.cryptoapiService.deleteOne(name);
    }
}
