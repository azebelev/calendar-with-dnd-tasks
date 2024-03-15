import { Container } from '../components/styled/Container';
import { CalendarHeader } from './Calendar/CalendarHeader';
import { CalendarGrid } from './Calendar/CalendarGrid';

export function Calendar() {
  return (
    <>
      <Container>
        <CalendarHeader />
        <CalendarGrid />
      </Container>
    </>
  );
}
