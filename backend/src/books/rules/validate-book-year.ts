import { BadRequestException } from "@nestjs/common";

export function validateYear(year?: number) {
    if (!year) return;

    const currentYear = new Date().getFullYear();

    if (year > currentYear)
        throw new BadRequestException("Year can not be in the future.")
}