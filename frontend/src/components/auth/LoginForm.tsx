"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "@/app/actions/auth"; // Ajuste para sua lógica de autenticação
import { ROUTES } from "@/configs/routes"; // Ajuste para suas rotas

interface FormValues {
  email: string;
  password: string;
}


const validationSchema = Yup.object({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
});

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setErrorMessage(""); // Limpa mensagens de erro anteriores

    try {
      const result = await login(values.email, values.password);

      if (result.success) {
        router.push(ROUTES.STUDENTS); // Redireciona para a rota de estudantes
      } else {
        setErrorMessage(
          result.error || "Ocorreu um erro. Verifique suas credenciais."
        );
      }
    } catch {
      setErrorMessage("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Input E-mail */}
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Digite seu e-mail"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              {/* Input Senha */}
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Digite sua senha"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              {/* Mensagem de erro */}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              {/* Botão de Login */}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting || loading}
              >
                {loading ? 'Carregando...' : 'Fazer Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
