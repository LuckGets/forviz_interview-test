import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateBorrowDto } from './dtos/create-borrow.dto';
import { Borrow } from '@prisma/client';
import { BorrowService } from './borrow.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { SearchBorrowDto } from './dtos/search-borrow.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Get('/search')
  findByQuery(@Query() query: SearchBorrowDto) {
    if (Object.keys(query).length < 1) return null;

    return this.borrowService.findByFilter(query);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create')
  async create(@Body() data: CreateBorrowDto): Promise<Borrow> {
    return this.borrowService.create(data);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('update/:bookId')
  async update(
    @Body() data: Partial<CreateBorrowDto>,
    @Param('bookId') bookId: string,
  ): Promise<Borrow> {
    return this.borrowService.update(Number(bookId), data);
  }
}
