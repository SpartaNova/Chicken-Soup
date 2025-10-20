import type { Quote } from "@/lib/quotes"

interface QuoteCardProps {
  quote: Quote
  index: number
}

export function QuoteCard({ quote, index }: QuoteCardProps) {
  const punctuation = "。"
  const quoteText =
    quote.text.endsWith("。") || quote.text.endsWith(".") || quote.text.endsWith("，") || quote.text.endsWith(",")
      ? quote.text.replace(/\.$/, "。")
      : quote.text + punctuation

  return (
    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-lg md:text-xl font-semibold text-secondary-foreground">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground mb-4 text-balance">{quoteText}</p>
          <p className="text-sm md:text-base text-muted-foreground font-medium">— {quote.author}</p>
        </div>
      </div>
    </div>
  )
}
