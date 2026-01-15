'use client';

interface Props {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: Props) {
  return (
    <div  className="flex items-center justify-end gap-3 p-3">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="px-3 py-2 text-sm rounded-lg border border-green-700/40 bg-neutral-900 text-green-100 disabled:opacity-50 hover:bg-neutral-800"
      >
        Anterior
      </button>
      <span className="text-sm text-green-300/80">
        Página {page} de {totalPages || 1}
      </span>
      <button
         onClick={onNext}
        disabled={page >= totalPages}
        className="px-3 py-2 text-sm rounded-lg border border-green-700/40 bg-neutral-900 text-green-100 disabled:opacity-50 hover:bg-neutral-800"
      >
        Próxima
      </button>
    </div>
  );
}