import type { Ref, UnwrapRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { SlateElement } from '@wangeditor-next/editor'
export type InsertFnType = (url: string, alt: string, href: string) => void
export type ImageElement = SlateElement & {
    src: string
    alt: string
    url: string
    href: string
}
export interface UserState {
    id?: number
    token?: string
    role: number
    username: string
    avatar: string
    department?: string
    phone: string
    mail: string
    age: string
}
export enum LayoutMode {
    LTR = 'ltr',
    LCR = 'lcr',
    TTB = 'ttb',
}

export enum DeviceType {
    PC = 'pc',
    PAD = 'pad',
    MOBILE = 'mobile',
}

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum SideTheme {
    DARK = 'dark',
    WHITE = 'white',
    BLUE = 'blue',
    IMAGE = 'image',
}

export enum PageAnim {
    FADE = 'fade',
    OPACITY = 'opacity',
    DOWN = 'down',
    SCALE = 'scale',
}

export interface AppConfigState {
    projectName: string
    theme: ThemeMode
    sideTheme: SideTheme
    themeColor: string
    layoutMode: LayoutMode
    deviceType: DeviceType
    sideWidth: number
    pageAnim: PageAnim
    isFixedNavBar: boolean
    isCollapse: boolean
    actionBar: {
        isShowSearch: boolean
        isShowMessage: boolean
        isShowRefresh: boolean
        isShowFullScreen: boolean
    }
}

export interface MenuOption {
    key: string | undefined
    label: string | undefined
    icon: string | undefined
    children: Array<MenuOption> | null
}

export interface SplitTab {
    label: string
    iconPrefix?: string | unknown
    icon: string
    fullPath: string
    children?: Array<RouteRecordRaw>
    checked: Ref<UnwrapRef<boolean>>
}

export interface OriginRoute {
    parentPath?: string
    menuUrl: string
    menuName?: string
    routeName?: string
    hidden?: boolean
    outLink?: string
    affix?: boolean
    cacheable?: boolean
    isRootPath?: boolean
    iconPrefix?: string
    icon?: string
    badge?: string | number
    isSingle?: boolean
    localFilePath?: string
    children?: Array<OriginRoute>
}
