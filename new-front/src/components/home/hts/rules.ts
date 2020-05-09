export function orderRegisterCheck(htsData: any, stdUnit: string, assetsData: any): {
  descPurchase: boolean, descSale: boolean, descStopLoss: boolean,
  stopLossErr: boolean, saleErr: boolean, purchaseErr: boolean,
  minPriceErr: boolean
} {
  return {
    descPurchase: descendingCheck(htsData, 'purchase'),
    descSale: descendingCheck(htsData, 'sale'),
    descStopLoss: descendingCheck(htsData, 'stopLoss'),
    stopLossErr: stopLossRule(htsData),
    saleErr: saleRule(htsData),
    purchaseErr: purchaseRule(htsData, stdUnit, assetsData),
    minPriceErr: minOrderRule(htsData)
  }
}

function descendingCheck(htsData: any, key: string): boolean {
  let saleError = false
  if (htsData[key]) {
    htsData[key].forEach((elm: any, idx: number) => {
      if (idx === 0 || !htsData[key]) { return }
      if (key !== 'purchase' && htsData[key][idx - 1].price > elm.price) { saleError = true }
      if (key === 'purchase' && htsData[key][idx - 1].price < elm.price) { saleError = true }
    })
  }
  return saleError
}

function stopLossRule(htsData: any): boolean {
  const minPurchase = htsData.purchase && htsData.purchase.length !== 0 ? htsData.purchase.reduce(
    (previous: { price: number }, current: { price: number }) => (previous.price > current.price ? current : previous)
  ) : -1
  let stopLossError = false
  if (minPurchase !== -1) {
    htsData.stopLoss.forEach((elm: any) => {
      if (elm.price > minPurchase.price) { stopLossError = true }
    })
  }
  return stopLossError
}

function saleRule(htsData: any): boolean {
  const maxPurchase = htsData.purchase && htsData.purchase.length !== 0 ? htsData.purchase.reduce(
    (previous: { price: number }, current: { price: number }) => (previous.price < current.price ? current : previous)
  ) : -1
  let saleError = false
  if (maxPurchase !== -1) {
    htsData.sale.forEach((elm: any) => {
      if (elm.price > maxPurchase.price) { saleError = true }
    })
  }
  return saleError
}

function purchaseRule(htsData: any, stdUnit: string, assetsData: any): boolean {
  const totalOrderPrice = htsData.purchase && htsData.purchase.length !== 0
    ? htsData.purchase.reduce((a: any, b: any) => (a + b.price), 0) : 0
  const nowAsset = assetsData ? assetsData.filter((elm: any) => elm.currency === stdUnit.toUpperCase()) : []
  let purchaseError = false
  if (nowAsset[0] && totalOrderPrice > nowAsset[0].balance) {
    purchaseError = true
  }
  return purchaseError
}

function minOrderRule(htsData: any): boolean {
  const purchaseData = htsData.purchase ? htsData.purchase : []
  const saleData = htsData.sale ? htsData.sale : []
  const stopLossData = htsData.stopLoss ? htsData.stopLoss : []

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

  const limitError = !(limitCheck(purchaseData) && limitCheck(saleData) && limitCheck(stopLossData))
  return limitError
}
