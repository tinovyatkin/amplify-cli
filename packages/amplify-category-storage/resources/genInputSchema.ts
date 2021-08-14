import { TypeDef, CLIInputSchemaGenerator} from "../../amplify-cli-core/lib";

// Defines the type names and the paths to the TS files that define them
const storageTypeDefs: TypeDef[] = [
  {
    typeName: 'S3CLIWalkthroughInterfaces',
    service: 's3',
    relativeSourcePaths: ['index.ts'],
  },
  {
    typeName: 'DDBCLIWalkthroughInterfaces',
    service: 's3',
    relativeSourcePaths: ['index.ts'],
  },
];

const schemaGenerator = new CLIInputSchemaGenerator(S3TypeDefs);
schemaGenerator.generateJSONSchemas(); //convert CLI input data into json schemas.