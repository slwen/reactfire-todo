'use strict';

require('./mock-dom')('<html><body></body></html>');

global.React       = require('react')
global.TestUtils   = require('react-addons-test-utils')
global.Simulate    = TestUtils.Simulate;
global.scryByType  = TestUtils.scryRenderedComponentsWithType;
global.findByType  = TestUtils.findRenderedComponentWithType;
global.scryByClass = TestUtils.scryRenderedDOMComponentsWithClass;
global.findByClass = TestUtils.findRenderedDOMComponentWithClass;
global.scryByTag   = TestUtils.scryRenderedDOMComponentsWithTag;
global.findByTag   = TestUtils.findRenderedDOMComponentWithTag;
global.chai        = require('chai')
global.expect      = chai.expect
global.should      = chai.should()
global.sinon       = require('sinon')

chai.use(require('sinon-chai'))
