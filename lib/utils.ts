export { cn } from "cn"

export function formatCurrency(
  amount: number | string | null | undefined,
  currencyOrOptions?: string | Intl.NumberFormatOptions,
  customOptions?: Intl.NumberFormatOptions
): string {
  if (amount === null || amount === undefined || amount === '') return ''
  const numericAmount = typeof amount === 'string' ? Number(amount) : amount
  if (isNaN(numericAmount)) return ''

  let currency = 'USD'
  let options: Intl.NumberFormatOptions = {}

  if (typeof currencyOrOptions === 'string') {
    currency = currencyOrOptions
    options = customOptions || {}
  } else if (typeof currencyOrOptions === 'object' && currencyOrOptions !== null) {
    options = currencyOrOptions
    currency = options.currency || 'USD'
  }

  const isSmallDecimal = numericAmount !== 0 && Math.abs(numericAmount) < 1

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: isSmallDecimal ? 6 : 2,
    ...options
  }).format(numericAmount)
}
