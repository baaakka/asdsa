export interface Theme {
  name: string;
  properties: { [key: string]: string } ;
}

export const LightTheme: Theme = {
  name: 'light-theme',
  properties: {
    '--scrollbar-color': 'rgba(0, 0, 0, 0.15)',

    '--pwa-bg-color': '#E74C81',

    '--color-gradient-left-icon': '#2BDFB4',
    '--color-gradient-right-icon': '#29ADDF',
    
    '--color-gradient-left-icon-hover': '#CE2791',
    '--color-gradient-right-icon-hover': '#FF7070',

    '--skeleton-color': '#EADDD0',
    '--color-bg-platform': 'rgba(255, 255, 255, 0.5)',
    '--header-color-gradient-left-1': '#CE2791',
    '--header-color-gradient-right-1': '#FF7070',

    '--header-color-gradient-left-2': '#FF7070',
    '--header-color-gradient-right-2': '#FB6A74',

    '--footer-color-gradient-left-1': '#2BDFB4',
    '--footer-color-gradient-right-1': '#29ADDF',

    '--color-fonts-list-head': '#977E89',

    '--border-list-color': 'rgba(0, 0, 0, 0.1)',

    '--border-platform-color': 'rgba(184, 134, 83, 0.25)',

    '--bg-platform-color': 'rgba(255, 255, 255, 0.5)',

    '--bg-get-reward-color': 'rgba(184, 134, 83, 0.2)',

    '--avatar-bg-color': 'rgba(171, 111, 38, 0.2)',

    '--color-tertiary-input': '#fff',
    '--color-header-active': '#ffffff',
    '--color-popular-text': '#ffffff',
    '--color-transparent': 'transparent',
    '--color-primary-1': '#CE2791',
    '--color-primary-2': '#FF7070',
    '--color-primary-3': '#F09447',
    '--color-primary-4': '#ECB21F',
    '--color-secondary-1': '#2BDFB4',
    '--color-secondary-2': '#29ADDF',
    '--color-tertiary-1': '#5533D2',
    '--color-tertiary-2': '#313C93',
    '--color-tertiary-3': '#2C58F5',
    '--color-tertiary-4': '#EBD9BC',
    '--color-tertiary-5': 'rgba(0, 0, 0, 0.1)',
    '--color-fonts-1': '#977E89',
    '--color-fonts-2': '#5C2448',
    '--color-fonts-3': '#FAF3F6',
    '--color-bg-1': '#FBF5EB',
    '--color-bg-2': '#FBE3D5',
    '--color-tooltip-text': '#5C2448',
    '--color-tooltip-close':'#977E89',
    '--size-tooltip-close': '12px',
    '--color-border-profile-image': 'rgba(0, 0, 0, 0.2)',

    '--box-shadow': 'rgba(152, 149, 149, 0.16)',

    '--reward-dropdown-color': 'rgba(0, 0, 0, 0.8)',

    '--deg-gradient-enabled-input': '180deg',
    '--gradient-left-enabled-input': '#F2CCAD 0%',
    '--gradient-right-enabled-input': '#F4ACAC 100%',


    '--deg-gradient-webclip-banner': '267.37deg',
    '--gradient-left-webclip-banner': '#F2CCAD 0%',
    '--gradient-right-webclip-banner': '#F4ACAC 100%',
    '--gradient-left-webclip-full': 'rgba(242, 204, 173, 0.3) 0%',
    '--gradient-right-webclip-full': 'rgba(244, 172, 172, 0.3) 100%',

    '--deg-popular-platform': '106.8deg',
    '--color-popular-platform-left': '#CF2892 7.2%',
    '--color-popular-platform-right': '#D6338C 94.65%',

    '--deg-gradient-1': '111.26deg',
    '--color-gradient-left-1': '#CE2791 3.93%',
    '--color-gradient-right-1': '#FF7070 87.6%',

    '--color-gradient-name-left-1': '#FF7070 3.93%',
    '--color-gradient-name-right-1': '#CE2791 87.6%',

    '--deg-gradient-2': '111.26deg',
    '--color-gradient-left-2': 'rgba(206, 39, 145, 0.23) 3.93%',
    '--color-gradient-right-2': 'rgba(255, 112, 112, 0.23) 87.6%',

    '--deg--profile-image': '111.26deg',
    '--profile-image-bg-color-left': 'rgba(206, 39, 145, 0.23) 3.93%',
    '--profile-image-bg-color-right': 'rgba(255, 112, 112, 0.23) 87.6%',

    '--deg-gradient-3': '115.76deg',
    '--color-gradient-left-3': '#2BDFB4 1.79%',
    '--color-gradient-right-3': '#29ADDF 81.02%',

    '--deg-gradient-4': '304.88deg',
    '--color-gradient-left-4': '#EF3F19 13.79%',
    '--color-gradient-right-4': '#EC1A1A 86.02%',

    '--deg-gradient-5': '180.19deg',
    '--color-gradient-left-5': '#FBF5EB 58.96%',
    '--color-gradient-right-5': '#FBE3D5 99.84%',

    '--deg-gradient-6': '115.76deg',
    '--color-gradient-left-6': '#ECB21F 1.79%',
    '--color-gradient-right-6': '#F7529C 81.02%',

    '--deg-gradient-7': '180deg',
    '--color-gradient-left-7': '#EF3F19 0%',
    '--color-gradient-right-7': '#EC721A 100%',

    '--deg-gradient-8': '180deg',
    '--color-gradient-left-8': 'rgba(239, 63, 25, 0.23) 0%',
    '--color-gradient-right-8': 'rgba(236, 114, 26, 0.23) 100%',

    '--deg-gradient-9': '180deg',
    '--color-gradient-left-9': '#6FDF2B 0%',
    '--color-gradient-right-9': '#2BDF89 100%',

    '--deg-gradient-10': '180deg',
    '--color-gradient-left-10': 'rgba(111, 223, 43, 0.23) 0%',
    '--color-gradient-right-10': 'rgba(43, 223, 137, 0.23) 100%',

    '--deg-gradient-11': '163.54deg',
    '--color-gradient-left-11': '#FFB800 11.4%',
    '--color-gradient-right-11': '#EBD511 88.6%',

    '--deg-gradient-12': '163.54deg',
    '--color-gradient-left-12': 'rgba(255, 184, 0, 0.23) 11.4%',
    '--color-gradient-right-12': 'rgba(235, 213, 17, 0.23) 88.6%',

    '--deg-gradient-disabled': '115.76deg',
    '--color-gradient-left-disabled': '#C3EDE0 1.79%',
    '--color-gradient-right-disabled': '#C8E3E8 81.02%',

    '--deg-gradient-shadow': '90deg',
    '--color-gradient-left-shadow': 'rgba(251, 245, 235, 0) 0%',
    '--color-gradient-right-shadow': '#FBF5EB 100%',

    '--deg-gradient-shadow-kol': '90deg',
    '--color-gradient-left-shadow-kol': 'rgba(251, 238, 226, 0) 0%',
    '--color-gradient-right-shadow-kol': '#FBEEE2 100%',

    '--deg-gradient-toastr': '304.88deg',
    '--color-toastr-left': '#EF3F1933',
    '--color-toastr-right': '#EC1A1A',
    '--color-toasrt-text': '#EC1A1A;',

    '--deg-gradient-get-sugar': '115.76deg',
    '--color-gradient-left-get-sugar': '#ECB21F 1.79%',
    '--color-gradient-right-get-sugar': '#F7529C 81.02%',

    '--opacity-color': 'rgba(0, 0, 0, 0.05)',

    '--webclip-box-shadow-color': 'rgba(84, 84, 84, 0.15)',
    '--webclip-border-color': 'rgba(0, 0, 0, 0.1)',

    '--deg-gradient-background-modal': '111.26deg',
    '--color-gradient-left-background-modal': '#CE2791 3.93%',
    '--color-gradient-right-background-modal': '#FF7070 87.6%',

    '--close-icon-color': '#5C2448',

    '--deg-gradient-live-events': '111.26deg',
    '--color-gradient-left-live-events': '#941B68 3.93%',
    '--color-gradient-right-live-events': '#FB7474 87.6%',
  },
};
export const DarkTheme: Theme = {
  name: 'dark-theme',
  properties: {
    '--scrollbar-color': 'rgba(255, 255, 255, 0.2)',

    '--pwa-bg-color': '#4D1445',

    '--color-gradient-left-icon': '#22BB96',
    '--color-gradient-right-icon': '#2290BA',

    '--color-gradient-left-icon-hover': '#941B68',
    '--color-gradient-right-icon-hover': '#FB7474',

    '--skeleton-color': '#34284C',
    '--color-bg-platform': 'rgba(65, 65, 65, 0.5)',

    '--header-color-gradient-left-1': '#60003D',
    '--header-color-gradient-right-1': '#523C73',

    '--deg--profile-image': '111.26deg',
    '--profile-image-bg-color-left': 'rgba(171, 196, 226, 0.2)',
    '--profile-image-bg-color-right': 'rgba(171, 196, 226, 0.2)',

    '--deg-gradient-webclip-banner': '267.37deg',
    '--gradient-left-webclip-banner': '#734E2F 0%',
    '--gradient-right-webclip-banner': '#580C3D 100%',
    '--gradient-left-webclip-full': 'rgba(115, 78, 47, 0.5) 0%',
    '--gradient-right-webclip-full': 'rgba(88, 12, 61, 0.5) 100%',

    '--reward-dropdown-color': 'rgba(70, 64, 83, 0.8)',

    '--header-color-gradient-left-2': '#523C73',
    '--header-color-gradient-right-2': '#54366E',

    '--footer-color-gradient-left-1': '#29777C',
    '--footer-color-gradient-right-1': '#0E2B56',

    '--color-fonts-list-head': '#C4C8D7',

    '--border-list-color': 'rgba(255, 255, 255, 0.1)',

    '--border-platform-color': 'rgba(255, 255, 255, 0.1)',

    '--bg-platform-color': 'rgba(65, 65, 65, 0.5)',

    '--bg-get-reward-color': 'rgba(184, 134, 83, 0.2)',
    '--avatar-bg-color': 'rgba(171, 196, 226, 0.2)',

    '--color-tertiary-input': '#332A43',
    '--color-header-active': '#ffffff',
    '--color-popular-text': '#E9E9E9',
    '--color-transparent': 'transparent',
    '--color-primary-1': '#941B68',
    '--color-primary-2': '#FB7474',
    '--color-primary-3': '#F09447',
    '--color-primary-4': '#ECB21F',
    '--color-secondary-1': '#22BB96',
    '--color-secondary-2': '#2290BA',
    '--color-tertiary-1': '#5533D2',
    '--color-tertiary-2': '#313C93',
    '--color-tertiary-3': '#2C58F5',
    '--color-tertiary-4': '#332A43',
    '--color-tertiary-5': '#5A5D66',
    '--color-fonts-1': '#8C93AC',
    '--color-fonts-2': '#EAEEFA',
    '--color-fonts-3': '#C4C8D7',
    '--color-bg-1': '#1B0C36',
    '--color-bg-2': '#0E0421',
    '--color-tooltip-text': '#EAEEFA',
    '--color-tooltip-close':'#22BB96',
    '--size-tooltip-close': '14px',

    '--box-shadow': 'rgba(125, 125, 125, 0.16)',

    '--deg-gradient-enabled-input': '180deg',
    '--gradient-left-enabled-input': '#B27B4D 0%',
    '--gradient-right-enabled-input': '#B76161 100%',

    '--deg-popular-platform': '106.8deg',
    '--color-popular-platform-left': '#941C68 7.2%',
    '--color-popular-platform-right': '#A2286A 94.65%',

    '--deg-gradient-1': '111.26deg',
    '--color-gradient-left-1': '#941B68 3.93%',
    '--color-gradient-right-1': '#FB7474 87.6%',

    '--color-gradient-name-left-1': '#FB7474 3.93%',
    '--color-gradient-name-right-1': '#941B68 87.6%',

    '--deg-gradient-2': '111.26deg',
    '--color-gradient-left-2': 'rgba(148, 27, 104, 0.23) 3.93%',
    '--color-gradient-right-2': 'rgba(251, 116, 116, 0.23) 87.6%',

    '--deg-gradient-3': '115.76deg',
    '--color-gradient-left-3': '#22BB96 1.79%',
    '--color-gradient-right-3': '#2290BA 81.02%',

    '--deg-gradient-4': '304.88deg',
    '--color-gradient-left-4': '#E13814 13.79%',
    '--color-gradient-right-4': '#CC1414 86.02%',

    '--deg-gradient-5': '138.9deg',
    '--color-gradient-left-5': '#1B0C36 12.25%',
    '--color-gradient-right-5': '#0E0421 92.3%',

    '--deg-gradient-6': '115.76deg',
    '--color-gradient-left-6': '#ECB21F 1.79%',
    '--color-gradient-right-6': '#F7529C 81.02%',

    '--deg-gradient-7': '180deg',
    '--color-gradient-left-7': '#EF3F19 0%',
    '--color-gradient-right-7': '#EC721A 100%',

    '--deg-gradient-8': '180deg',
    '--color-gradient-left-8': 'rgba(239, 63, 25, 0.23) 0%',
    '--color-gradient-right-8': 'rgba(236, 114, 26, 0.23) 100%',

    '--deg-gradient-9': '180deg',
    '--color-gradient-left-9': '#6FDF2B 0%',
    '--color-gradient-right-9': '#2BDF89 100%',

    '--deg-gradient-10': '180deg',
    '--color-gradient-left-10': 'rgba(111, 223, 43, 0.23) 0%',
    '--color-gradient-right-10': 'rgba(43, 223, 137, 0.23) 100%',

    '--deg-gradient-11': '180deg',
    '--color-gradient-left-11': '#FFB800 0%',
    '--color-gradient-right-11': '#EBD511 100%',

    '--deg-gradient-12': '180deg',
    '--color-gradient-left-12': 'rgba(255, 184, 0, 0.23) 0%',
    '--color-gradient-right-12': 'rgba(235, 213, 17, 0.23) 100%',

    '--deg-gradient-disabled': '115.76deg',
    '--color-gradient-left-disabled': '#1B384E 1.79%',
    '--color-gradient-right-disabled': '#162A4D 81.02%',

    '--deg-gradient-shadow': '90deg',
    '--color-gradient-left-shadow': 'rgba(19, 7, 40, 0) 0%',
    '--color-gradient-right-shadow': '#130728 100%',

    '--deg-gradient-shadow-kol': '90deg',
    '--color-gradient-left-shadow-kol': 'rgba(16, 6, 36, 0) 0%',
    '--color-gradient-right-shadow-kol': '#100624 100%',

    '--deg-gradient-toastr': '304.88deg',
    '--color-toastr-left': '#E1381440',
    '--color-toastr-right': '#CC141440',
    '--color-toasrt-text': '#EC1A1A;',

    '--deg-gradient-get-sugar': '111.26deg',
    '--color-gradient-left-get-sugar': '#460B31 3.93%',
    '--color-gradient-right-get-sugar': '#342267 87.6%',

    '--opacity-color': 'rgba(255, 255, 255, 0.04)',
    
    '--deg-gradient-background-modal': '111.26deg',
    '--color-gradient-left-background-modal': '#460B31 3.93%',
    '--color-gradient-right-background-modal': '#592267 87.6%',

    '--webclip-box-shadow-color': 'rgba(84, 84, 84, 0.15)',
    '--webclip-border-color': 'rgba(0, 0, 0, 0.1)',

    '--close-icon-color': '#EAEEFA',

    '--deg-gradient-live-events': '111.26deg',
    '--color-gradient-left-live-events': '#941B68 3.93%',
    '--color-gradient-right-live-events': '#FB7474 87.6%',
  },
};
