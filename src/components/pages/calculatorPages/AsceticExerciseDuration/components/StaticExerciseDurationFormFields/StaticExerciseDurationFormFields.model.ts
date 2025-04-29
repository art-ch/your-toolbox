import { z } from 'zod';

export const temperature = z.preprocess((value) => Number(value), z.number());
