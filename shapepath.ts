import { readFileSync } from 'fs'
import { Parser as N3Parser, Store } from 'n3'
import { Parser, Ast } from 'shape-path-core'
import * as ShExApi from '@shexjs/api'
import fetch from 'node-fetch'
const Api = ShExApi({fetch})
import * as ShExUtil from '@shexjs/util'
import { shapePathQuery } from '@shexjs/shape-path-query'

(async function(){
  const turtleText = readFileSync('HypoglycemiaManagement.ttl', 'utf-8')
  const dataset = new Store(new N3Parser().parse(turtleText))
  const schema = (await Api.load(['https://raw.githubusercontent.com/solid/data-interoperability-panel/main/proposals/primer/snippets/bob.example/CarePlan-shapes.shex'], [], [], [])).schema
  const pathStr = '@<http://hl7.org/fhir/AppointmentLocation>~<http://hl7.org/fhir/link>'
  const pathExpr = new Parser.ShapePathParser().parse(pathStr)
  const schemaNodes = pathExpr.evalPathExpr([schema], new Ast.EvalContext(schema))
  console.log('schemaNodes:', schemaNodes)
  const node = 'http://bob.example/data/A-CarePlan-F/A-HypoglycemiaManagement-F'
  const shape = 'http://hl7.org/fhir/CarePlan'
  const db = ShExUtil.rdfjsDB(dataset)
  const result = shapePathQuery(schema, schemaNodes, db, [{node, shape}])
  console.log('result:', result)
})()
