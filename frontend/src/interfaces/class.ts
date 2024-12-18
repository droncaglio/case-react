
export interface ListClassesResponseData{
    message?: string;
    data?: Class[];
}

export interface Class{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}