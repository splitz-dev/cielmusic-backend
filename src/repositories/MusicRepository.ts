import { EntityRepository } from 'typeorm';
import { Music } from '../models/Music';
import { BaseRepository } from './base/BaseRepository';

@EntityRepository(Music)
export class MusicRepository extends BaseRepository<Music> {}
