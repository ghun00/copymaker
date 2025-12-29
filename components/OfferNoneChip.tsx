'use client'

type OfferNoneChipProps = {
  onClick: () => void
  disabled?: boolean
}

export default function OfferNoneChip({ onClick, disabled = false }: OfferNoneChipProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 relative rounded-lg shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#b7b9c9] border-solid inset-0 pointer-events-none rounded-lg transition-colors duration-200 group-hover:border-[#ff5c00] group-hover:bg-[#fff5f0]"
      />
      <p className="font-normal leading-[1.4] relative shrink-0 text-[#626474] text-base whitespace-nowrap transition-colors duration-200 group-hover:text-[#ff5c00]">
        혜택 없음
      </p>
    </button>
  )
}

