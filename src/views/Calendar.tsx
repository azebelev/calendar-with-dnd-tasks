import { Container } from '../components/styled/Container';
import { CalendarControlPanel } from './Calendar/CalendarControlPanel';
import { CalendarGrid } from './Calendar/CalendarGrid';

export function Calendar() {
  return (
    <>
      <Container>
        <CalendarControlPanel />
        <CalendarGrid />
      </Container>
    </>
  );
}
