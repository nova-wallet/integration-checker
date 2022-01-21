import got from "got";
import { strict as assert } from "assert";
import projects from "./testData";

projects.forEach(function (project) {
  describe("Subquery health check", function () {
    it(`Production project - ${project} is alive`, async function () {
      const url = `https://api.subquery.network/subqueries/nova-wallet/nova-${project}?stage=false`
      const response = await got(url)
      // {
      //   searchParams: new URLSearchParams({ stage: 'false'})
      // })
      const body = JSON.parse(response.body)

      if (body.deployed) {
        assert(body.deployment.healthStatus.indexer, `Indexer for ${project} network is up`)
        assert(body.deployment.healthStatus.query, `Query for ${project} network is up`)
      } else {
        assert(body.deployed, `Project ${project} is not deployed yet`)
      }
    })

    it(`Staging project - ${project} is alive`, async function () {
      const url = `https://api.subquery.network/subqueries/nova-wallet/nova-${project}?stage=true`
      const response = await got(url)
      // {
      //   searchParams: new URLSearchParams({ stage: 'false'})
      // })
      const body = JSON.parse(response.body)

      if (body.deployed) {
        assert(body.deployment.healthStatus.indexer, `Indexer for ${project} network is up`)
        assert(body.deployment.healthStatus.query, `Query for ${project} network is up`)
      } else {
        assert(body.deployed, `Project ${project} is not deployed yet`)
      }
    })
  })
})
