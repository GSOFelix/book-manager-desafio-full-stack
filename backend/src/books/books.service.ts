import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { validateYear } from './rules/validate-book-year';
import { PagedRequest } from './dto/pagedRequest.dto';
import { contains } from 'class-validator';
import { PaginationHelper } from 'src/common/helper/pagination.helper';

@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateBookDto) {
        validateYear(data.year);

        return this.prisma.book.create({
            data,
        });
    }

    async findById(idBook: string) {
        return this.prisma.book.findUnique({ where: { id: idBook } });
    }

    async findAll(pagedDto: PagedRequest) {
        const { page, limit,title } = pagedDto;
        const skip = PaginationHelper.calculateSkip(page, limit);
        const where = title ?
            {
                title: {
                    contains: title,
                    mode: 'insensitive' as const
                }
            }
            :
            undefined;

        const [books, total] = await Promise.all([
            this.prisma.book.findMany({ where,skip, take: limit }),
            this.prisma.book.count({where}),
        ]);

        return PaginationHelper.buildResponse(books, total, page, limit);

    }

    async update(idBook: string, data: UpdateBookDto) {
        validateYear(data.year);
        try {
            await this.prisma.book.update({
                where: { id: idBook },
                data,
            });

            return {
                message: "Updated succesful."
            }
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Book reported not found');
            }
            throw error;
        }

    }

    async delete(idBook: string) {
        try {
            await this.prisma.book.delete({
                where: { id: idBook },
            });

            return {
                message: "Deleted succesful."
            }
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new NotFoundException('Book not found');
            }
            throw error;
        }
    }


}
