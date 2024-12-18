import { NewStudentForm } from "@/components/student/NewStudentForm";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Container,
} from "react-bootstrap";
import Link from "next/link";
import { ROUTES } from "@/configs/routes";
import { getClassesAction } from "@/app/actions/class";
import { ArrowBigLeft } from "lucide-react";

export default async function NewStudentPage() {
  const response = await getClassesAction();

  if (!response.success) {
    // Em caso de erro na busca pelas turmas, exibimos o erro
    return (
      <div className="mx-8 h-full flex flex-col">
        <h1 className="font-bold text-lg mt-4">Novo Estudante</h1>
        <p className="text-sm text-gray-600 mt-2">
          Não foi possível carregar as turmas para criar um novo estudante.
        </p>

        <div className="mt-4">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-red-600">
                Erro ao buscar turmas
              </CardTitle>
            </CardHeader>

            <p className="text-sm text-red-500">
              {response.error || "Ocorreu um erro desconhecido."}
            </p>
            <div className="flex justify-end mt-4">
              <Link href={ROUTES.STUDENTS}>
                <Button variant="outline">Voltar</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Caso sucesso, renderiza o formulário normalmente
  const classes = response.data?.data; // resultado agrupado de turmas
  return (
    <Container className="mx-8 h-full flex flex-col">
      <div className="flex items-center justify-between p-1 bg-white mt-4">
        <h1 className="font-bold text-lg">Criar Novo Estudante</h1>
        <Link href={ROUTES.STUDENTS} passHref>
          <Button variant="success">
            <ArrowBigLeft className="mr-2" /> Voltar
          </Button>
        </Link>
      </div>

      {/* Campos de pesquisa */}
      <Card className="mt-4 p-4">
        <NewStudentForm classes={classes!} />
      </Card>
    </Container>
  );
}
