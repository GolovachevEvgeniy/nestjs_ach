import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { Record } from '../../records/schemas/record.schema';

export type RecordValueDocument = RecordValue & Document;

@Schema({ _id: false })
export class RecordValue {
  @Prop({ type: Types.ObjectId }) _id: Types.ObjectId;
  @Prop() value: string;
  @Prop() time: string;
  @Prop() description: string;
  @Prop() dayTypeId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }) record: Record;
}

export const RecordValueSchema = SchemaFactory.createForClass(RecordValue);

RecordValueSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};
