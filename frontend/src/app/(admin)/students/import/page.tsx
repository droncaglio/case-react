import { ImportStudentForm } from "@/components/student/ImportStudentForm";
import {
  Card,
  Button,
  Container,
} from "react-bootstrap";
import Link from "next/link";
import { ROUTES } from "@/configs/routes";
import { ArrowBigLeft } from "lucide-react";

export default function ImportStudentPage() {


  return (
    <Container className="mx-8 h-full flex flex-col">
      <div className="flex items-center justify-between p-1 bg-white mt-4">
        <h1 className="font-bold text-lg">Importar Estudantes</h1>
        <Link href={ROUTES.STUDENTS} passHref>
          <Button variant="success">
            <ArrowBigLeft className="mr-2" /> Voltar
          </Button>
        </Link>
      </div>

      {/* Formulario de importação */}
      <Card className="mt-4 p-4">
        <ImportStudentForm />
      </Card>
    </Container>
  );
}
