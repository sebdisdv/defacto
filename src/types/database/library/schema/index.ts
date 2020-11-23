export interface DBLibrarySchemaResource {
    id: string;
    name: string;
}

export interface DBLibrarySchema {
    resources: DBLibrarySchemaResource[];
    ubications: string[];
}
