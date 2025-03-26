import { Heading } from '@chakra-ui/react';
import { modalStyles } from './../../utils/globalStyles';
import Modal from 'react-modal';

const InvitationModal = ({ isOpen, onRequestClose, heading, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles}>
      {heading && (
        <Heading borderBottom={'1px solid black'} as={'h4'} color={'#750815'}>
          {heading}
        </Heading>
      )}
      {children}
    </Modal>
  );
};

export default InvitationModal;
