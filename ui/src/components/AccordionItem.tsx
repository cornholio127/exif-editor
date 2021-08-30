import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';
import { AccordionContext } from './Accordion';

interface Props {
  className?: string;
  title: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 34px;
`;

const Header = styled.div<{ open: boolean }>`
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  box-shadow: ${({ open }) => (open ? '0 4px 12px -10px' : 'none')};
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  padding: 16px 8px;
  box-shadow: inset 0px -16px 16px -26px;
  overflow-y: auto;
  max-height: 100%;
  flex-shrink: 1;
  flex-grow: 1;
`;

const AccordionItem: React.FC<Props> = ({ className, title, children }) => {
  const [id] = useState(uniqid());
  const ctx = useContext(AccordionContext);
  useEffect(() => {
    ctx.addItem(id);
    return () => ctx.removeItem(id);
  }, []);
  const open = ctx.isOpen(id);
  return (
    <Container className={className}>
      <Header open={open} onClick={() => ctx.setOpen(id)}>
        {title}
      </Header>
      {open && <Content>{children}</Content>}
    </Container>
  );
};

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
