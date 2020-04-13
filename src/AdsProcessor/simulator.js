import createAdRunner from "./ads-runner"

export default function performTest( testSetup = {runs: 100, clickMap: {A: 0.1} } ) {
  const { runs, clickMap } = testSetup
  const runner = createAdRunner()

  const testStat = {
    shows: {},
    clicks: {}
  }

  for (let i = 0; i < runs; i++) {
    const ad = runner.getAd()

    // stat
    testStat.shows[ad.id] = 1 + (testStat.shows[ad.id] ? testStat.shows[ad.id] : 0)

    const probability = clickMap[ad.id] ? clickMap[ad.id] : 0

    if (Math.random() < probability) {
      runner.onClick(ad.id)
      // stat
      testStat.clicks[ad.id] = 1 + (testStat.clicks[ad.id] ? testStat.clicks[ad.id] : 0)
    }
  }

  return testStat
}