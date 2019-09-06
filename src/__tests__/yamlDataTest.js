'use strict';

const fs = require('fs');
const path = require('path');
const YamlData = require('../main/yamlData.ts').YamlData;

const dir = path.dirname(module.parent.filename);
const inputFile = path.join(dir, 'resources', 'pipeline.yaml');
const outputFile = path.join(dir, 'resources', 'output.yaml');

it('no params throws error', () => {
  expect(() => YamlData.readFromFile()).toThrow();
});

it('non-existant file throws error', () => {
  expect(() => YamlData.readFromFile('resources/DOES_NOT_EXIST')).toThrow();
});

it('Able to read basic file', () => {
  expect(YamlData.readFromFile(inputFile).getInput()).toEqual({
    AWSTemplateFormatVersion: '2010-09-09',
    Description: 'Test yaml injector',
    Resources: {
      HelloBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          AccessControl: 'PublicRead'
        }
      }
    }
  });
});

it('Able to merge new data', () => {
  expect(YamlData.readFromFile(inputFile).merge({
    test: '1'
  }).getInput()).toEqual({
    AWSTemplateFormatVersion: '2010-09-09',
    Description: 'Test yaml injector',
    Resources: {
      HelloBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          AccessControl: 'PublicRead'
        }
      }
    },
    test: '1'
  });
});

it('Able to merge new to existing data', () => {
  expect(YamlData.readFromFile(inputFile).merge({
    Resources: {
      HelloBucket: {
        Properties: {
          test: '2'
        }
      }
    }
  }).getInput()).toEqual({
    AWSTemplateFormatVersion: '2010-09-09',
    Description: 'Test yaml injector',
    Resources: {
      HelloBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          AccessControl: 'PublicRead',
          test: '2'
        }
      }
    }
  });
});


it('Able to write data', () => {
  YamlData.readFromFile(inputFile).merge({
    Resources: {
      HelloBucket: {
        Properties: {
          test: '2'
        }
      }
    }
  }).write(outputFile);

  expect(fs.readFileSync(outputFile, 'utf8')).toEqual(`AWSTemplateFormatVersion: '2010-09-09'
Description: Test yaml injector
Resources:
  HelloBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      AccessControl: PublicRead
      test: '2'
`);
});
