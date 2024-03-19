import { User } from "../user.schema";

export class RegisterDto {
    /**
     * Nome do usuário
     * @example 'João da Silva'
     */
    nome: string;

    /**
     * Email do usuário
     * @example 'joaosilva@hotmail.com'
     */
    email: string;

    /**
     * Senha do usuário
     * @example '123456'
     */
    senha: string;

    /**
     * Telefone do usuário
     * @example '11999999999'
     */
    telefone?: string;

    /**
     * Endereço do usuário
     * @example 'Rua das Flores, 123'
     */
    endereco?: string;
}