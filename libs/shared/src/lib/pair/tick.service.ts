import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tick } from './schemas/tick.schema';
import { Pair } from './schemas/pair.schema';

@Injectable()
export class TickService {
  constructor(
    @InjectModel(Tick.name) private readonly tickModel: Model<Tick>
  ) {}

  async create(tick: Tick): Promise<Tick> {
    const createdTick = new this.tickModel(tick);
    return createdTick.save();
  }
  async createForPair(pair: Pair, price: number): Promise<Tick> {
    const createdTick = new this.tickModel({
      pair,
      price,
    });
    return createdTick.save();
  }
  async findAll(pair: Pair): Promise<Tick[]> {
    return this.tickModel.find({ pair }).exec();
  }
}
