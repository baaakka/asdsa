import { RewardModel } from '../model';

export type GetAllRewardResponseBody = {
  data: RewardModel<unknown>[];
  count: number;
  page: number;
  pageSize: number;
};
