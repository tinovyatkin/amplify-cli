import {TypeDef, CLIInputSchemaGenerator} from "amplify-cli-core";

//ResourceProvider TypeDefs
const DDBStorageTypeDef : TypeDef = {
  typeName: 'DDBCLIWalkthroughInterfaces',
  service: 's3',
  relativeSourcePaths: ['index.ts'],
}
const S3StorageTypeDef : TypeDef = {
  typeName: 'S3CLIWalkthroughInterfaces',
  service: 's3',
  relativeSourcePaths: ['index.ts']
}

// Defines the type names and the paths to the TS files that define them
const storageCategoryTypeDefs: TypeDef[] = [
  DDBStorageTypeDef,
  S3StorageTypeDef
];

const schemaGenerator = new CLIInputSchemaGenerator(storageCategoryTypeDefs);
schemaGenerator.generateJSONSchemas(); //convert CLI input data into json schemas.