import { SortRewardEum, SortUserEum } from "@cake/lib-api-interface";
import { DropDownOption } from "../types/drop-down-option.interface";

export const kolSortOptions: Array<DropDownOption> = [
    {
        value: SortUserEum.Reward,
        label: 'Rewards'
    },
    {
        value: SortUserEum.Cakebox,
        label: 'Cakeboxes'
    },
    {
        value: SortUserEum.FollowedByIDs,
        label: 'Followers'
    },
    {
        value: SortUserEum.Rank,
        label: 'Rank'
    },
    {
        value: SortUserEum.CreatedAt,
        label: 'Time in Cak3'
    },
    {
        value: SortUserEum.Role,
        label: 'Role'
    },
]

export const rewardsSortOptions: Array<DropDownOption> = [
    {
        value: SortRewardEum.Cost,
        label: 'Latest price'
    },
    // {
    //     value: 'hype',
    //     label: 'Hype'
    // },
    // {
    //     value: 'quality',
    //     label: 'Quality'
    // },
    // {
    //     value: 'engagement',
    //     label: 'Engagement'
    // },
    {
        value: SortRewardEum.Rarity,
        label: 'Rarity'
    },
    {
        value: SortRewardEum.Category,
        label: 'Category'
    },
]