// app/(admin)/students/page.tsx
'use client';

import React, { useEffect, useState, useTransition, useCallback  } from "react";
import { Card, Table, Button, FormControl, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { getStudentsAction, deleteStudentAction } from "@/app/actions/students";
import Link from "next/link"; 
import { Eye, Edit, Trash, Plus } from 'lucide-react';
import Swal from "sweetalert2";
import PaginationComponent from "@/components/PaginationComponent";
import { Student } from "@/interfaces/student";
import { ROUTES } from "@/configs/routes";

export default function StudentsPage() {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, startTransition] = useTransition();
  const [totalPages, setTotalPages] = useState<number>(0);

// Função para buscar os alunos
const fetchData = useCallback(async () => {

  startTransition(async () => {
    try {
      const response = await getStudentsAction({ q: name, page });

      if (response.success) {
        setStudents(response.data?.data ?? []);
        setTotalPages(response.data?.totalPages ?? 0);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.error ?? 'Erro ao buscar alunos.');
        setStudents([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro inesperado ao buscar alunos.');
      setStudents([]);
      setTotalPages(0);
    } 
  });
}, [name, page]);

  // useEffect para buscar os alunos quando name, page ou perPage mudam
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
    });

    if (result.isConfirmed) {
      try {
        const deleteResponse = await deleteStudentAction(id);

        if (deleteResponse.success) {
          Swal.fire('Deletado!', 'O aluno foi deletado.', 'success');

          fetchData();
        } else {
          Swal.fire('Erro!', deleteResponse.message || 'Ocorreu um erro ao deletar o aluno.', 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Erro!', 'Ocorreu um erro ao deletar o aluno.', 'error');
      }
    }
  };

  return (
    <Container className="mx-8 h-full flex flex-col">
      <div className="flex items-center justify-between p-1 bg-white mt-4">
        <h1 className="font-bold text-lg">Listagem de Estudantes</h1>
        <Link href={ROUTES.STUDENTS_NEW} passHref>
          <Button variant="success">
            <Plus className="mr-2" /> Criar Novo Aluno
          </Button>
        </Link>

        <Link href={ROUTES.STUDENTS_IMPORT} passHref>
          <Button variant="success" className="ml-2">
            <Plus className="mr-2" /> Importar Alunos
          </Button>
        </Link>
      </div>

      {/* Campos de pesquisa */}
      <Card className="mt-4 p-4">
        <Row className="mb-4">
          <Col md={6}>
              <FormControl
                placeholder="Pesquisar por nome"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setPage(1); // Resetar para a página 1
                }}
              />
          </Col>
        </Row>

        {/* Mensagem de erro */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        {/* Tabela de alunos */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Turma</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.class.name}</td>
                  <td>
                    <Link href={ROUTES.STUDENTS_SHOW(student.id)} passHref>
                      <Button variant="info" size="sm" className="mr-2">
                        <Eye /> Visualizar
                      </Button>
                    </Link>
                    <Link href={ROUTES.STUDENTS_EDIT(student.id)} passHref>
                      <Button variant="warning" size="sm" className="mr-2">
                        <Edit /> Editar
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>
                      <Trash /> Deletar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  Nenhum aluno encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Paginação */}
        <PaginationComponent currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </Card>
    </Container>
  );
}