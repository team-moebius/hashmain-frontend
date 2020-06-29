export function orderRegisterCheck(htsData: any, stdUnit: string, assetsData: any): {
  descPurchase: boolean, descSale: boolean, descStopLoss: boolean,
  stoplossErr: boolean, saleErr: boolean, purchaseErr: boolean,
  minPriceErr: boolean
} {
  return {
    descPurchase: false, // descendingCheck(htsData, 'purchase'),
    descSale: false, // descendingCheck(htsData, 'sale'),
    descStopLoss: false, // descendingCheck(htsData, 'stoploss'),
    stoplossErr: false, // hasStoplossGreaterThanEqualLowestPurchase(htsData),
    saleErr: false, // hasSaleLessThanEqualHighestPurchase(htsData),
    purchaseErr: false, // isTotalOrderPriceGreaterThanBalance(htsData, stdUnit, assetsData),
    minPriceErr: minOrderRule(htsData)
  }
}

// function descendingCheck(htsData: any, key: string): boolean {
//   let saleError = false
//   if (htsData[key]) {
//     htsData[key].forEach((elm: any, idx: number) => {
//       if (idx === 0 || !htsData[key]) { return }
//       if (key !== 'purchase' && htsData[key][idx - 1].price > elm.price) { saleError = true }
//       if (key === 'purchase' && htsData[key][idx - 1].price < elm.price) { saleError = true }
//     })
//   }
//   return saleError
// }

// function hasStoplossGreaterThanEqualLowestPurchase(htsData: any): boolean {
//   const purchases = htsData.purchase
//   let lowestPurchasePrice = Number.MAX_VALUE

//   if (purchases && purchases.length !== 0) {
//     lowestPurchasePrice = purchases.map((purchase: any) => purchase.price)
//       .reduce((previousPrice: number, currentPrice: number) => (Math.min(previousPrice, currentPrice)))
//   }

//   return htsData.stoploss.some((e: any) => e.price >= lowestPurchasePrice)
// }

// function hasSaleLessThanEqualHighestPurchase(htsData: any): boolean {
//   const purchases = htsData.purchase
//   let highestPurchasePrice = Number.MIN_VALUE

//   if (purchases && purchases.length !== 0) {
//     highestPurchasePrice = purchases.map((purchase: any) => purchase.price)
//       .reduce((previousPrice: number, currentPrice: number) => (Math.max(previousPrice, currentPrice)))
//   }

//   return htsData.sale.some((e: any) => e.price <= highestPurchasePrice)
// }

// // fixme : not working
// function isTotalOrderPriceGreaterThanBalance(htsData: any, stdUnit: string, assetsData: any): boolean {
//   const purchases = htsData.purchase
//   let totalOrderPrice = 0
//   let currentAsset = { balance: 0 }

//   if (purchases && purchases.length !== 0) {
//     totalOrderPrice = purchases.map((purchase: any) => purchase.price)
//       .reduce((previousPrice: number, currentPrice: number) => previousPrice + currentPrice, 0)
//   }

//   if (assetsData) {
//     currentAsset = assetsData.find((asset: any) => asset.currency === stdUnit.toUpperCase())
//   }

//   return totalOrderPrice > currentAsset.balance;
// }

function minOrderRule(htsData: any): boolean {
  const purchaseData = htsData.purchase ? htsData.purchase : []
  const saleData = htsData.sale ? htsData.sale : []
  const stoplossData = htsData.stoploss ? htsData.stoploss : []

  const limitCheck = (data: Array<any>): boolean => {
    let isPossible = true
    data.forEach((elm: any) => {
      let limitPrice = 500
      if (elm.symbol && elm.symbol.indexOf('BTC') >= 0) {
        limitPrice = 1000
      }
      if (elm.price * elm.volume < limitPrice) {
        isPossible = false
      }
    })
    return isPossible
  }

  const limitError = !(limitCheck(purchaseData) && limitCheck(saleData) && limitCheck(stoplossData))
  return limitError
}
