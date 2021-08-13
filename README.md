# shapepath-node-for-pavlik
typescript @shexjs/shape-path-query demo for Elf Pavlik

``` shell
PS1=10:12:24-eric@touchy:/tmp/checkouts/ericprud/shapepath-node-for-pavlik$ npm ci
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142

added 149 packages, and audited 150 packages in 2s

27 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
apparently the including tsconfig.json needs tweaking:
``` bash
PS1=10:14:43-eric@touchy:/tmp/checkouts/ericprud/shapepath-node-for-pavlik$ tsc
shapepath.ts:4:26 - error TS7016: Could not find a declaration file for module '@shexjs/api'. '/tmp/checkouts/ericprud/shapepath-node-for-pavlik/node_modules/@shexjs/api/shex-api.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/shexjs__api` if it exists or add a new declaration (.d.ts) file containing `declare module '@shexjs/api';`

4 import * as ShExApi from '@shexjs/api'
                           ~~~~~~~~~~~~~

shapepath.ts:5:19 - error TS7016: Could not find a declaration file for module 'node-fetch'. '/tmp/checkouts/ericprud/shapepath-node-for-pavlik/node_modules/node-fetch/lib/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/node-fetch` if it exists or add a new declaration (.d.ts) file containing `declare module 'node-fetch';`

5 import fetch from 'node-fetch'
                    ~~~~~~~~~~~~

shapepath.ts:7:27 - error TS7016: Could not find a declaration file for module '@shexjs/util'. '/tmp/checkouts/ericprud/shapepath-node-for-pavlik/node_modules/@shexjs/util/shex-util.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/shexjs__util` if it exists or add a new declaration (.d.ts) file containing `declare module '@shexjs/util';`

7 import * as ShExUtil from '@shexjs/util'
                            ~~~~~~~~~~~~~~

shapepath.ts:8:32 - error TS7016: Could not find a declaration file for module '@shexjs/shape-path-query'. '/tmp/checkouts/ericprud/shapepath-node-for-pavlik/node_modules/@shexjs/shape-path-query/shape-path-query.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/shexjs__shape-path-query` if it exists or add a new declaration (.d.ts) file containing `declare module '@shexjs/shape-path-query';`

8 import { shapePathQuery } from '@shexjs/shape-path-query'
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~


Found 4 errors.
```
but running it with an argument (and thereby ignoring the tsconfig.json (why the hell does it do that?!?)) works:
``` bash
PS1=10:14:46-eric@touchy:/tmp/checkouts/ericprud/shapepath-node-for-pavlik$ tsc shapepath.ts 
```
For debugging, I dump the intermediate schemaNodes and the selected RDF nodes:
``` bash
PS1=10:14:59-eric@touchy:/tmp/checkouts/ericprud/shapepath-node-for-pavlik$ node shapepath.js 
schemaNodes: [
  {
    type: 'TripleConstraint',
    predicate: 'http://hl7.org/fhir/link',
    valueExpr: { type: 'NodeConstraint', nodeKind: 'iri' }
  }
]
result: [ 'http://bob.example/data/A-Location-F/A-HomeAddress-F' ]
```
