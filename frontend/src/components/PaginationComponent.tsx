// src/components/PaginationComponent.tsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Função para criar um array de números para as páginas
  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages === 0) return null; // Não exibe a paginação se não houver páginas

  return (
    <Pagination className="justify-content-center">
      {/* Botão de Página Anterior */}
      <Pagination.Prev
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {/* Botões de Número de Página */}
      {getPageNumbers().map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handleClick(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {/* Botão de Próxima Página */}
      <Pagination.Next
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
