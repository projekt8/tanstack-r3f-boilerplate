import { Container } from '@/components/Container';

export const Footer = () => {
  return (
    <footer className="z-10 border-t border-white/10 bg-black py-10">
      <Container className="text-center font-serif text-xl">
        Built with <span className="text-gradient-primary">&#x2665;</span> using modern standards.
      </Container>
    </footer>
  );
};
