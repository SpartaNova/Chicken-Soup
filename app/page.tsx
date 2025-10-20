"use client"

import { useState, useEffect } from "react"
import { QuoteCard } from "@/components/quote-card"
import { chinaQuotes, foreignQuotes } from "@/lib/quotes"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const QUOTES_PER_PAGE = 5

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)

  const isChinesePage = currentPage % 2 === 0
  const sourceQuotes = isChinesePage ? chinaQuotes : foreignQuotes

  // 计算在当前来源中的页码（每个来源独立计数）
  const sourcePageIndex = Math.floor(currentPage / 2)

  // 获取当前页显示的名言
  const startIndex = sourcePageIndex * QUOTES_PER_PAGE
  const displayQuotes = sourceQuotes.slice(startIndex, startIndex + QUOTES_PER_PAGE)

  // 计算总页数（中国和外国各自的页数之和 × 2）
  const totalChinaPages = Math.ceil(chinaQuotes.length / QUOTES_PER_PAGE)
  const totalForeignPages = Math.ceil(foreignQuotes.length / QUOTES_PER_PAGE)
  const maxPages = Math.max(totalChinaPages, totalForeignPages)
  const totalPages = maxPages * 2

  // 从 localStorage 加载状态
  useEffect(() => {
    const savedPage = localStorage.getItem("currentQuotePage")
    if (savedPage) setCurrentPage(Number.parseInt(savedPage, 10))
  }, [])

  // 保存状态到 localStorage
  useEffect(() => {
    localStorage.setItem("currentQuotePage", currentPage.toString())
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && displayQuotes.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // 检查是否还有下一页内容
  const hasNextPage = currentPage < totalPages - 1 && displayQuotes.length > 0

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-5">
            <svg
              className="w-12 h-12 md:w-16 md:h-16"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 碗的主体 */}
              <path
                d="M12 28C12 28 12 42 32 42C52 42 52 28 52 28"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse cx="32" cy="28" rx="20" ry="4" fill="currentColor" opacity="0.1" />
              <ellipse cx="32" cy="28" rx="20" ry="4" stroke="currentColor" strokeWidth="2.5" />

              {/* 碗底 */}
              <path
                d="M20 42C20 42 22 48 32 48C42 48 44 42 44 42"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* 热气 */}
              <path
                d="M26 18C26 18 24 14 26 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M32 16C32 16 30 12 32 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M38 18C38 18 36 14 38 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">品牌鸡汤</h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground text-balance">轻奢版鸡汤，卫生又健康</p>
        </header>

        {/* 名言列表 */}
        <div className="space-y-4 md:space-y-5 mb-10 md:mb-12">
          {displayQuotes.map((quote, index) => (
            <QuoteCard key={`${currentPage}-${index}`} quote={quote} index={index} />
          ))}
        </div>

        {/* 翻页控制 */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            variant="outline"
            size="lg"
            className="flex-1 md:flex-none rounded-xl h-12 md:h-14 text-base md:text-lg font-medium bg-transparent disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            上一页
          </Button>

          <div className="text-center">
            <p className="text-sm md:text-base text-muted-foreground">
              第 {currentPage + 1} / {totalPages} 页
            </p>
          </div>

          <Button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            variant="outline"
            size="lg"
            className="flex-1 md:flex-none rounded-xl h-12 md:h-14 text-base md:text-lg font-medium bg-transparent disabled:opacity-50"
          >
            下一页
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  )
}
