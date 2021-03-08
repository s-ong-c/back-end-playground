import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Asset } from './Asset'

@Entity({
  name: 'historical_prices',
})
export class HistoricalPrice {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  asset_id!: number

  @Column({
    type: 'varchar',
    length: 10,
  })
  type!: string

  @Column({ type: 'timestamp' })
  date!: Date

  @Column({ type: 'double' })
  high!: number

  @Column({ type: 'double' })
  low!: number

  @Column({ type: 'double' })
  open!: number

  @Column({ type: 'double' })
  close!: number

  @Column({ type: 'double' })
  adjusted_close!: number

  @Column({ type: 'double' })
  volume!: number

  @ManyToOne((type) => Asset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'asset_id' })
  asset!: Asset
}