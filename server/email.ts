import { MailService } from '@sendgrid/mail';

// Configuração do serviço de e-mail do SendGrid
const mailService = new MailService();

if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Envia um e-mail usando o serviço SendGrid
 * @param to Endereço de e-mail do destinatário
 * @param subject Assunto do e-mail
 * @param text Corpo do e-mail em texto simples
 * @param html Corpo do e-mail em HTML (opcional)
 * @returns Promise com o resultado do envio
 */
export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  try {
    const msg = {
      to,
      from: 'contato@desenroladireito.com.br', // E-mail de origem verificado no SendGrid
      subject,
      text,
      html: html || text,
    };

    await mailService.send(msg);
    console.log('E-mail enviado com sucesso via SendGrid');
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, error };
  }
}

// Verificar se as variáveis de ambiente estão configuradas
export function checkEmailConfig() {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('Aviso: A variável de ambiente SENDGRID_API_KEY está faltando');
    return false;
  }
  
  return true;
}