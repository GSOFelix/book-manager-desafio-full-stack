import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/createBook.dto';

@Injectable()
export class BooksService {
    constructor(private readonly prisma:PrismaService){}

    async create(data: CreateBookDto){
        return this.prisma.book.create({
            data,
        });
    }
    
}
