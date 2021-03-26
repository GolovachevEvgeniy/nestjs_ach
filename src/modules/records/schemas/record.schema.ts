import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { RecordValue } from "../../records-values/schemas/record-value.schema";

export type RecordDocument = Record & Document;

@Schema({ _id: false })
export class Record {
  @Prop({ type: Types.ObjectId }) _id: Types.ObjectId;
  @Prop({ type: String, unique: true }) date: string;
  @Prop() description: string;
  @Prop() createdAt: string;
  @Prop() updatedAt: string;
  @Prop() contentTypeId: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'RecordValue' }) values: RecordValue[];
}

export const RecordSchema = SchemaFactory.createForClass(Record);

RecordSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};