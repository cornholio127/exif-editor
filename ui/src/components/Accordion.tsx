import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const Container = styled.div`
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

interface ContextValue {
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  isOpen: (id: string) => boolean;
  setOpen: (id: string) => void;
}

export const AccordionContext = React.createContext<ContextValue>({} as never);

const Accordion: React.FC<Props> = ({ className, children }) => {
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState<string>();
  const addItem = (id: string) => {
    setItems(i => i.concat([id]));
  };
  const removeItem = (id: string) => {
    setItems(i => i.filter(e => e !== id));
  };
  const isOpen = (id: string) => (open ?? items[0]) === id;
  return (
    <Container className={className}>
      <AccordionContext.Provider value={{ addItem, removeItem, isOpen, setOpen }}>{children}</AccordionContext.Provider>
    </Container>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
