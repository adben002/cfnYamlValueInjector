import { ImmutableUtils } from "immutable-typescript";
import { Arguments } from "yargs";

export class Params {

  private static checkNotEmpty<T extends any>(input: T, message: string): T {
    if ((input === null) || (input === undefined)) {
      throw new Error(message);
    }
    return input;
  }

  public readonly inputFile: string;
  public readonly outputFile: string;
  public readonly paramValues: object;

  constructor(private readonly args: Arguments) {
    this.inputFile = Params.checkNotEmpty(this.args.input, "Missing input");

    this.outputFile = Params.checkNotEmpty(this.args.output, "Missing output");

    if (this.args.param !== undefined && typeof this.args.param !== 'object') {
      throw new Error("Params must be defined with nested values");
    }
    this.paramValues = ImmutableUtils.asImmutable({ ...{}, ...this.args.param });
  }

}
