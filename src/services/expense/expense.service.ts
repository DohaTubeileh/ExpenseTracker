import { Injectable } from '@nestjs/common';
import { CreateExpenseDto, UpdateExpenseDto, FilterExpenseDto } from './dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, createExpenseDto: CreateExpenseDto) {
    const result = await this.databaseService.expense.create({
      data: {
        ...createExpenseDto,
        date: new Date(),
        userId: userId,
      },
    });
    return result;
  }

  findAll(userId: number, filterExpenseDto: FilterExpenseDto) {
    const { to, from } = filterExpenseDto;
    const result = this.databaseService.expense.findMany({
      where: {
        userId: userId,
        date: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      },
    });
    return result;
  }

  findOne(expenseId: number, userId: number) {
    const result = this.databaseService.expense.findUnique({
      where: { userId: userId, id: expenseId },
    });
    return result;
  }

  update(userId: number, updateExpenseDto: UpdateExpenseDto) {
    const result = this.databaseService.expense.update({
      data: {
        ...updateExpenseDto,
        date: new Date(),
      },
      where: { userId: userId, id: updateExpenseDto.id },
    });
    return result;
  }

  remove(expenseId: number, userId: number) {
    const result = this.databaseService.expense.delete({
      where: { userId: userId, id: expenseId },
    });
    return result;
  }
}
