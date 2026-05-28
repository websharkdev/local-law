import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface PasswordResetSuccessEmailProps {
  email: string;
}

const PasswordResetSuccessEmail = ({
  email,
}: PasswordResetSuccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your LocalLaw AI password has been reset</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>LocalLaw AI</Text>
          <Text style={styles.title}>Password reset successful</Text>
          <Text style={styles.copy}>
            The password for <strong>{email}</strong> has been changed
            successfully.
          </Text>
          <Text style={styles.copy}>
            If you did not make this change, please contact support immediately
            or reset your password again.
          </Text>
          <Button href="https://local-law.com/auth/sign-in" style={styles.button}>
            Sign in to your account
          </Button>
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

export { PasswordResetSuccessEmail };
