import { EditStudentForm } from "@/components/student/EditStudentForm";
import { EditStudentPageProps } from "@/interfaces/student";
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
import { getStudentAction } from "@/app/actions/students";
import { ArrowBigLeft } from "lucide-react";

export default async function EditStudentPage({ params }: EditStudentPageProps) {
  const studentId = Number(params.id);

  const response = await getClassesAction();
  const studentResult = await getStudentAction(studentId);

  if (!response.success || !studentResult.success) {
    // Em caso de erro na busca pelas turmas, exibimos o erro
    return (
      <div className="mx-8 h-full flex flex-col">
        <h1 className="font-bold text-lg mt-4">Editar Estudante</h1>
        <p className="text-sm text-gray-600 mt-2">
          Não foi possível carregar as informações para editar o estudante.
        </p>

        <div className="mt-4">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-red-600">
                Erro ao buscar turmas ou aluno
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

  const classes = response.data?.data;
  const student = studentResult.data!;
  return (
    <Container className="mx-8 h-full flex flex-col">
      <div className="flex items-center justify-between p-1 bg-white mt-4">
        <h1 className="font-bold text-lg">Editar Estudante</h1>
        <Link href={ROUTES.STUDENTS} passHref>
          <Button variant="success">
            <ArrowBigLeft className="mr-2" /> Voltar
          </Button>
        </Link>
      </div>

      {/* Campos de pesquisa */}
      <Card className="mt-4 p-4">
        <EditStudentForm studentData={student} classes={classes!}/>
      </Card>
    </Container>
  );
}
