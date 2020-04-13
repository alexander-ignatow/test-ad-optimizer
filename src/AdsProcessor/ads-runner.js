import { minBy, find, maxBy, filter } from 'lodash'

const ALLOWED_LEADER_RATIO = 3
const CYCLES_FOR_RE_EVAL = 100

const STARTING_ADS_IDS = [
  'A', 'B', 'C', 'D', 'E'
]

class AdRunner {
  constructor () {
    this.availableAds = STARTING_ADS_IDS.map((id) => {
      return {
        id,
        shows: 0,
        hits: 0
      }
    })

    this.optimizationCycleCounter = 0
  }

  _runPossibleOptimisations () {
    if (this.availableAds.length <= 1) {
      // ok - one ad - no need to optimize
      return
    }

    // 1. tick cycle counter if needed
    let shows = this.availableAds[0].shows

    for (let i = 1; i < this.availableAds.length; i++) {
      if (this.availableAds[i].shows !== shows) {
        // don't do anything
        return
      }
    }

    this.optimizationCycleCounter++
  
    if (this.optimizationCycleCounter < CYCLES_FOR_RE_EVAL) {
      return
    }

    // start optimisation pass
  
    // the best ad
    const leader = maxBy(this.availableAds, 'hits')

    // ratios (the lower - the better. >1)
    const ratios = this.availableAds.map((ad) => {
      return {
        ...ad,
        leaderRatio: (leader.hits / ad.hits)
      }
    })

    // now filter
    // keep only ads with acceptable ratio
    const remainingIds = filter(ratios, (ad) => !isNaN(ad.leaderRatio) && ad.leaderRatio < ALLOWED_LEADER_RATIO).map((ad) => ad.id)
    this.availableAds = filter(this.availableAds, (ad) => remainingIds.indexOf(ad.id) >= 0)

    // reset counter
    this.optimizationCycleCounter = 0
  }

  getAd () {
    // select ad with least shows
    const ad = minBy(this.availableAds, 'shows')
    ad.shows++

    this._runPossibleOptimisations()

    return {
      id: ad.id
    }
  }

  getAdWithoutOptimization () {
     // select ad with least shows
     const ad = minBy(this.availableAds, 'shows')
     ad.shows++

     // just return result - no optimisations

     return {
       id: ad.id
     }
  }

  onClick (id) {
    const ad = find(this.availableAds, { id })
    if (ad) {
      ad.hits++
    }
  }
}

export default function createAdRunner () {
  return new AdRunner()
}