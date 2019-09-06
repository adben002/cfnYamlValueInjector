# cfnValueInjector
Cloudformation value injector

[![Build Status](https://api.travis-ci.org/adben002/cfnYamlValueInjector.svg?branch=master)](https://api.travis-ci.org/adben002/cfnYamlValueInjector.svg?) 
[![Coverage Status](https://coveralls.io/repos/github/adben002/cfnYamlValueInjector/badge.svg?branch=master)](https://coveralls.io/github/adben002/cfnYamlValueInjector?branch=master)

Installation:
```bash
npm install -g @adben002/cfn-yaml-value-injector
```

Example usage:

```bash
cfn-yaml-value-injector --input=pipeline.yaml --output=output.yaml --param.Mappings.InstanceValues.someKey=somevalue
```
