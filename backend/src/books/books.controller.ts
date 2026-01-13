import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateBookDto } from './dto/updateBook.dto';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) { }


    @Post('create')
    async create(@Body() createBookDto: CreateBookDto) {
        return await this.bookService.create(createBookDto);
    }

    @Get()
    async getaAll(@Query('title') title?: string) {
        return this.bookService.findAll(title);
    }

    @Get(':id')
    async getaById(@Param('id') id: string) {
        return this.bookService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatBookDto: UpdateBookDto) {
       return this.bookService.update(id,updatBookDto);
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.bookService.delete(id);
    }
}
