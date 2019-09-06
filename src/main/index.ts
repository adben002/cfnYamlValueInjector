import * as yargs from 'yargs';
import { Params } from './params';
import { YamlData } from './yamlData';

const argv: yargs.Arguments = yargs.
  usage('Usage: $0 --input=<input_file> --output=<output_file> --param.[val1].[val2]')
  .command('input_file', 'Input cloudformation file to inject to')
  .command('output_file', 'Output cloudformation file to write injected values to')
  .example('$0 --input=src/__tests__/resources/pipeline.yaml --output=src/__tests__/resources/integration_output.yaml --param.Mappings.InstanceValues.someKey=somevalue', 'Simple write')
  .alias('i', 'input')
  .alias('o', 'output')
  .help('h')
  .alias('h', 'help')
  .demandOption(['input', 'output'])
  .argv;

const params: Params = new Params(argv);

YamlData
  .readFromFile(params.inputFile)
  .merge(params.paramValues)
  .write(params.outputFile);
