import { DBLibrarySchemaResource } from '../../../../database';

export type ApiGetLibrariesLidSchemaResources = DBLibrarySchemaResource[];

export type ApiGetLibrariesLidSchemaResourcesRid = DBLibrarySchemaResource;

export type ApiPostLibrariesLidSchemaResourcesBody = FormData;
export type ApiPostLibrariesLidSchemaResourcesResult = string;

export type ApiPatchLibrariesLidSchemaResourcesBody = Partial<Omit<DBLibrarySchemaResource, 'id'>>;