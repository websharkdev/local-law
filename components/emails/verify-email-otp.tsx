import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailOtpProps {
  email: string;
  otp: string;
}

const VerifyEmailOtp = ({ email, otp }: VerifyEmailOtpProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your LocalLaw AI verification code</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.eyebrow}>LocalLaw AI</Text>
          <Text style={styles.title}>Confirm your email</Text>
          <Text style={styles.copy}>
            Use this code to confirm {email} and finish setting up your account.
          </Text>
          <Section style={styles.codeBox}>
            <Text style={styles.code}>{otp}</Text>
          </Section>
          <Text style={styles.copy}>
            If you did not request this code, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: "#f7f4ef",
    color: "#1a1c21",
    fontFamily: "Arial, sans-serif",
    margin: "0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    margin: "32px auto",
    padding: "32px",
    width: "480px",
  },
  eyebrow: {
    color: "#ba8747",
    fontSize: "14px",
    margin: "0 0 18px",
  },
  title: {
    color: "#1a1c21",
    fontSize: "28px",
    lineHeight: "1.2",
    margin: "0 0 12px",
  },
  copy: {
    color: "rgba(26, 28, 33, 0.72)",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: "0 0 20px",
  },
  codeBox: {
    backgroundColor: "#f4eee6",
    borderRadius: "16px",
    margin: "8px 0 24px",
    padding: "18px",
    textAlign: "center" as const,
  },
  code: {
    color: "#1a1c21",
    fontSize: "32px",
    letterSpacing: "8px",
    lineHeight: "1",
    margin: "0",
  },
};

export { VerifyEmailOtp };
