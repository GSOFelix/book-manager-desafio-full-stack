import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
import { validateYear } from './rules/validate-book-year';

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

    async findAll(title?: string) {
        return this.prisma.book.findMany({
            where: title
                ? {
                    title: {
                        contains: title,
                        mode: 'insensitive',
                    },
                }
                : undefined,
        });
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
