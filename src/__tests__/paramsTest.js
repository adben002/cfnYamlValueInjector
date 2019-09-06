'use strict';
const Params = require('../main/params.ts').Params;


it('no params throws error', () => {
  expect(() => new Params).toThrow();
});

it('Missing input', () => {
  expect(() => new Params({
    output: '1',
    param: {
      a: '2'
    }
  })).toThrow();
});

it('Missing output', () => {
  expect(() => new Params({
    input: '1',
    param: {
      a: '2'
    }
  })).toThrow();
});

it('Missing params', () => {
  let params = new Params({
    input: '1',
    output: '2'
  });
  expect(params.inputFile).toEqual('1');
  expect(params.outputFile).toEqual('2');
  expect(params.paramValues).toEqual({});
});

it('Expected data', () => {
  let params = new Params({
    input: '1',
    output: '2',
    param: {
      test1: '3',
      test2: '4'
    }
  });
  expect(params.inputFile).toEqual('1');
  expect(params.outputFile).toEqual('2');
  expect(params.paramValues).toEqual({
    test1: '3',
    test2: '4'
  });
});

it('Expected data nested', () => {
  let params = new Params({
    input: '1',
    output: '2',
    param: {
      Mappings: {
        test1: '3',
        test2: '4'
      }
    }
  });
  expect(params.inputFile).toEqual('1');
  expect(params.outputFile).toEqual('2');
  expect(params.paramValues).toEqual({
    Mappings: {
      test1: '3',
      test2: '4'
    }
  });
});

it('Params not an object', () => {
  expect(() => new Params({
    input: '1',
    output: '2',
    param: '3'
  })).toThrow();
});
