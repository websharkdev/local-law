import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  email: string;
  url: string;
}

const ResetPasswordEmail = ({ email, url }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your LocalLaw AI password</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>LocalLaw AI</Text>
          <Text style={styles.title}>Reset your password</Text>
          <Text style={styles.copy}>
            We received a password reset request for {email}. Use the button
            below to choose a new password. This link expires in 1 hour.
          </Text>
          <Button href={url} style={styles.button}>
            Reset password
          </Button>
          <Text style={styles.copy}>
            If you did not request this change, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: '#f7f4ef',
    color: '#1a1c21',
    fontFamily: 'Arial, sans-serif',
    margin: '0',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    margin: '32px auto',
    padding: '32px',
    width: '480px',
  },
  eyebrow: {
    color: '#ba8747',
    fontSize: '14px',
    margin: '0 0 18px',
  },
  title: {
    color: '#1a1c21',
    fontSize: '28px',
    lineHeight: '1.2',
    margin: '0 0 12px',
  },
  copy: {
    color: 'rgba(26, 28, 33, 0.72)',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '0 0 20px',
  },
  button: {
    backgroundColor: '#ba8747',
    borderRadius: '999px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '15px',
    padding: '13px 22px',
    textDecoration: 'none',
  },
};

export { ResetPasswordEmail };
