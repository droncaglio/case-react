'use client';

import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { importStudentAction } from "@/app/actions/students";

export const ImportStudentForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, selecione um arquivo CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);
    setMessage(null);

    const result = await importStudentAction(formData);

    setLoading(false);
    if (result.success) {
      setMessage(result.message!);
    } else {
      setError(result.error as string);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Arquivo CSV</Form.Label>
        <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Importando..." : "Importar"}
      </Button>
    </Form>
  );
};
