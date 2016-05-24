
// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
'use strict';

import 'angular';
import 'angular-mocks/angular-mocks';

var testsContext = require.context(".", true, /.spec.js$/);
testsContext.keys().forEach(testsContext);