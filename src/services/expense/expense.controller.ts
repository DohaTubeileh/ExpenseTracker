import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto, FilterExpenseDto } from './dto/';
import { AuthGuard } from '@nestjs/passport';
import { ExpensePayload } from './decorator/expense.decorator';
import { type JwtPayload } from '../../types/jwt.payload';

@UseGuards(AuthGuard('jwt'))
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post('create')
  create(
    @ExpensePayload() user: JwtPayload,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expenseService.create(user.userId, createExpenseDto);
  }

  @Get('list')
  findAll(
    @ExpensePayload() user: JwtPayload,
    @Query() filterExpenseDto: FilterExpenseDto,
  ) {
    return this.expenseService.findAll(user.userId, filterExpenseDto);
  }

  @Get('list/:id')
  findOne(@ExpensePayload() user: JwtPayload, @Param('id') id: string) {
    return this.expenseService.findOne(user.userId, +id);
  }

  @Patch('update')
  update(
    @ExpensePayload() user: JwtPayload,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(user.userId, updateExpenseDto);
  }

  @Delete('delete/:id')
  remove(@ExpensePayload() user: JwtPayload, @Param('id') id: string) {
    return this.expenseService.remove(user.userId, +id);
  }
}
