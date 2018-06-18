export interface Navitems {
    displayName: string;
    disabled?: boolean;
    route?: string;
    children?: Navitems[];
}
