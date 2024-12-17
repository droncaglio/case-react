import * as Yup from 'yup';

// Definindo o schema de validação para o login
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de e-mail inválido')
    .required('O e-mail é obrigatório'),
  
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
});
