export interface NavItem{
    displayName: string;
    iconName?: string;
    route?: string;
    flag?: string;
    disabled?: boolean;
    children?: NavItem[];
}