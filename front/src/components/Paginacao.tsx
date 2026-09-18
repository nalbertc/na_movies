
interface PaginacaoProps {
  totalItens: number
  itensPorPagina: number
  paginaAtual: number
  setPaginaAtual: React.Dispatch<React.SetStateAction<number>>
}

export function Paginacao({ totalItens, itensPorPagina, paginaAtual, setPaginaAtual }: PaginacaoProps) {


  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  const paginasVisiveis = 5; // Quantidade de números de página visíveis
  const metadePaginasVisiveis = Math.floor(paginasVisiveis / 2);

  let inicioPaginas = paginaAtual - metadePaginasVisiveis;
  let finalPaginas = paginaAtual + metadePaginasVisiveis;

  if (inicioPaginas < 1) {
    inicioPaginas = 1;
    finalPaginas = paginasVisiveis;
  }

  if (finalPaginas > totalPaginas) {
    finalPaginas = totalPaginas;
    inicioPaginas = totalPaginas - paginasVisiveis + 1;
    if (inicioPaginas < 1) {
      inicioPaginas = 1;
    }
  }

  const paginas = [];
  for (let i = inicioPaginas; i <= finalPaginas; i++) {
    paginas.push(i);
  }

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const irParaPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  console.log((paginaAtual - 1) * 20)

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        onClick={paginaAnterior}
        disabled={paginaAtual === 1}
        className="px-3 py-1 bg-gray-300 rounded"
      >
        &laquo; Anterior
      </button>
      {paginas.map((pagina) => (
        <button
          key={pagina}
          onClick={() => irParaPagina(pagina)}
          className={`px-3 py-1 rounded ${pagina === paginaAtual ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
        >
          {pagina}
        </button>
      ))}
      <button
        onClick={proximaPagina}
        disabled={paginaAtual === totalPaginas}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        Próxima &raquo;
      </button>
    </div>
  );
}


