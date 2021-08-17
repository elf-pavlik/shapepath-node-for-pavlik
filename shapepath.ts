import { readFileSync } from 'fs'
import { Parser as N3Parser, Store } from 'n3'
import { Parser, Ast } from 'shape-path-core'
import * as ShexCParser from '@shexjs/parser'
import * as ShExUtil from '@shexjs/util'
import { shapePathQuery } from '@shexjs/shape-path-query'



(async function(){
  // const node = 'http://bob.example/data/A-CarePlan-F/A-HypoglycemiaManagement-F'
  // const shape = 'http://hl7.org/fhir/CarePlan'
  // const pathStr = '@<http://hl7.org/fhir/AppointmentLocation>~<http://hl7.org/fhir/link>'
  // const turtleText = readFileSync('HypoglycemiaManagement.ttl', 'utf-8')
  // const schemaText = readFileSync('CarePlan-shapes.shex', 'utf-8')

  const node = 'https://pro.alice.example/ccbd77ae-f769-4e07-b41f-5136501e13e7#project'
  const shape = 'https://solidshapes.example/shapes/Project'
  const pathStr = '@<https://solidshapes.example/shapes/Project>~<https://vocab.example/project-management/hasTask>'
  const turtleText = readFileSync('ccbd77ae-f769-4e07-b41f-5136501e13e7.ttl', 'utf-8')
  const schemaText = readFileSync('project.shex', 'utf-8')

  const dataset = new Store(new N3Parser().parse(turtleText))
  const shexParser = ShexCParser.construct()
  const schema = shexParser.parse(schemaText)
  const pathExpr = new Parser.ShapePathParser().parse(pathStr)
  const schemaNodes = pathExpr.evalPathExpr([schema], new Ast.EvalContext(schema))
  console.log(schemaNodes)
  const db = ShExUtil.rdfjsDB(dataset)
  const result = shapePathQuery(schema, schemaNodes, db, [{node, shape}])
  console.log('result:', result)
})()
