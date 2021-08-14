/**
 * Utility base classes for all categories : CLIInputSchemaGenerator
 * Generates JSON-schema from Typescript structures.The generated schemas
 * can be used for run-time validation of Walkthrough/Headless structures.
 */
import { getProgramFromFiles, buildGenerator, PartialArgs } from 'typescript-json-schema';
import fs from 'fs-extra';
import path from 'path';

// Interface types are expected to be exported as "typeName" in the file
export type TypeDef = {
  typeName: string;
  relativeSourcePaths: string[];
  service: string;
};

export class CLIInputSchemaGenerator {
  // Paths are relative to the package root
  TYPES_SRC_ROOT = './resources/service-walkthrough-types/';
  SCHEMA_FILES_ROOT = './resources/schemas';
  OVERWRITE_SCHEMA_FLAG = '--overwrite';

  private serviceTypeDefs: TypeDef[];

  private getSchemaFileNameForType(typeName: string):string {
    return `${typeName}.schema.json`;
  }

  private getTypesSrcRootForSvc(svcName: string):string  {
    return `${this.TYPES_SRC_ROOT}/${svcName}`;
  }

  private getSvcFileAbsolutePath(svcName: string, relativeSrcPath: string):string  {
    return path.resolve(path.join(this.getTypesSrcRootForSvc(svcName), relativeSrcPath));
  }

  private printWarningSchemaFileExists() {
    console.info('The interface version must be bumped after any changes.');
    console.info(`Use the ${this.OVERWRITE_SCHEMA_FLAG} flag to overwrite existing versions`);
    console.info('Skipping this schema');
  }

  private printSuccessSchemaFileWritten(typeName: string) {
    console.log(`Schema written for type ${typeName}.`);
  }

  constructor(typeDefs: TypeDef[]) {
    this.serviceTypeDefs = typeDefs;
  }

  public generateJSONSchemas(): string[] {
    const force = process.argv.includes(this.OVERWRITE_SCHEMA_FLAG);
    const generatedFilePaths: string[] = [];

    // schema generation settings. see https://www.npmjs.com/package/typescript-json-schema#command-line
    const settings: PartialArgs = {
      required: true,
    };

    for (const typeDef of this.serviceTypeDefs) {
      //get absolute file paths
      const files = typeDef.relativeSourcePaths.map(relativePath => this.getSvcFileAbsolutePath(typeDef.service, relativePath));
      const typeSchema = buildGenerator(getProgramFromFiles(files), settings)!.getSchemaForSymbol(typeDef.typeName);
      const schemaFilePath = path.resolve(
        path.join(this.SCHEMA_FILES_ROOT, typeDef.service, this.getSchemaFileNameForType(typeDef.typeName)),
      );
      if (!force && fs.existsSync(schemaFilePath)) {
        this.printWarningSchemaFileExists();
        return generatedFilePaths;
      }
      fs.ensureFileSync(schemaFilePath);
      fs.writeFileSync(schemaFilePath, JSON.stringify(typeSchema, undefined, 4));
      this.printSuccessSchemaFileWritten(typeDef.typeName);
      generatedFilePaths.push( schemaFilePath );
    }
    return generatedFilePaths;
  }

}
