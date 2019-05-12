import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, BadRequestException, UsePipes, UseGuards } from '@nestjs/common';
import { CryptoCurrencyDto } from './dto/cryptoCurrency.dto';
import { UpdateCryptoCurrencyDto } from './dto/updateCryptoCurrency.dto';
import { CryptoapiService } from './cryptoapi.service';
import { CustomHttpExceptionFilter } from './filters/custom-http-exception.filter';
import { NameValidationPipe } from './pipes/name-validation.pipe';
import { CryptoDtoValidationPipe } from './pipes/crypto-dto-validation.pipe';
import { IdentifyPipe } from './pipes/identify.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('cryptoapi')
export class CryptoapiController {
    constructor(private readonly cryptoapiService: CryptoapiService) { }

    // GET /api
    @Get()
    @UseFilters(CustomHttpExceptionFilter)
    @UseGuards(AuthGuard('bearer'))
    fetchAll() {
        return this.cryptoapiService.fetchAll();
    }

    // GET /api/find/:name
    @Get('find/:name')
    @UseFilters(CustomHttpExceptionFilter)
    @UsePipes(NameValidationPipe)
    findOne(@Param('name') name: string) {
        return this.cryptoapiService.findOne(name);
    }

    // POST /api/add-crypto
    @Post('add-crypto')
    // method-scoped pipe - will validate all arguments passed
    // @UsePipes(MyValidationPipe)
    @UsePipes(IdentifyPipe)
    addOne(
        // param-scoped pipe - used to validate specific arguments
        @Body(new CryptoDtoValidationPipe()) newCrypto: CryptoCurrencyDto,
    ) {
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
