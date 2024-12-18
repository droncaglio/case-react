// src/components/students/NewStudentForm.tsx
"use client";

import React, { useState } from "react";
import { Form, Button, Alert, Spinner, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createStudentAction } from "@/app/actions/students"; // Ajuste o caminho conforme sua estrutura
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  NewStudentFormProps,
  CreateStudentPayload
} from "@/interfaces/student";


const validationSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    classId: yup.number().required("Turma é obrigatória"),
    image: yup
      .mixed<FileList>()
      .optional()
      .test("fileSize", "Imagem muito grande", (value) => {
        if (!value || value.length === 0) return true;
        if (!(value instanceof FileList)) return false;
        return value.length > 0 && value[0].size <= 1048576; // 1MB
      })
      .test("fileType", "Formato de imagem inválido", (value) => {
        if (!value || value.length === 0) return true;
        if (!(value instanceof FileList)) return false;
        return value.length > 0 && ["image/jpeg", "image/png"].includes(value[0].type);
      }),
  });
  

export function NewStudentForm({ classes }: NewStudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentPayload>({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: CreateStudentPayload) => {
    setLoading(true);
    setApiError(null);

    // Criar um FormData para enviar dados com multipart/form-data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("classId", data.classId.toString());
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await createStudentAction(formData);

      if (response.success) {
        Swal.fire("Sucesso!", "Estudante criado com sucesso.", "success");
        reset(); // Limpar o formulário
        router.push("/students"); // Redirecionar para a listagem de estudantes
      } else {
        setApiError(response.error || "Ocorreu um erro ao criar o estudante.");
      }
    } catch (error) {
      console.error(error);
      setApiError("Erro inesperado ao criar o estudante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* Nome */}
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome do estudante"
          {...register("name")}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Email */}
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Digite o email do estudante"
          {...register("email")}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Turma */}
      <Form.Group controlId="formClassId" className="mb-3">
        <Form.Label>Turma</Form.Label>
        <Form.Control as="select"
          {...register("classId")}
          isInvalid={!!errors.classId}
          defaultValue="1"
        >
          <option value="" disabled>
            Selecione uma turma
          </option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.classId?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Imagem */}
      <Form.Group controlId="formImage" className="mb-3">
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register('image')}
          isInvalid={!!errors.image}
          onChange={handleImageChange}
        />
        <Form.Control.Feedback type="invalid">
          {errors.image?.message}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Tamanho máximo: 1MB. Formatos permitidos: JPG, PNG.
        </Form.Text>
      </Form.Group>

      {/* Pré-visualização da Imagem */}
      {imagePreview && (
        <div className="mb-3">
          <Image src={imagePreview} alt="Pré-visualização da imagem" style={{ width: '200px' }} />
        </div>
      )}

      {/* Mensagem de erro da API */}
      {apiError && <Alert variant="danger">{apiError}</Alert>}

      {/* Botão de Submissão */}
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />{" "}
            Carregando...
          </>
        ) : (
          "Criar Estudante"
        )}
      </Button>
    </Form>
  );
}
