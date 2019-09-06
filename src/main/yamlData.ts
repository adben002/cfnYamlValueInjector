import * as deepmerge from 'deepmerge';
import * as fs from 'fs';
import { yamlDump, yamlParse } from 'yaml-cfn';

export class YamlData {

  public static readFromFile(inputFile: string): YamlData {
    return new YamlData(yamlParse(fs.readFileSync(inputFile, 'utf8')));
  }

  private readonly inputData: object;

  private constructor(inputData: object) {
    this.inputData = { ...{}, ...inputData };
  }

  public getInput(): object {
    return { ...{}, ...this.inputData };
  }

  public write(output: string): YamlData {
    fs.writeFileSync(output, yamlDump(this.inputData));
    return this;
  }

  public merge(dataToMerge: object): YamlData {
    return new YamlData(deepmerge.default(this.inputData, dataToMerge));
  }

}
