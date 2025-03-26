export const flexStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
};

export const linkStyles = {
  color: '#26C2AF',
  textDecoration: 'underline',
};

export const dropDownStyles = {
  zIndex: '999',
  position: 'absolute',
  color: 'grey',
  right: '20px',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0px 1px 5px -1px rgba(0, 0, 0, 0.75)',
  borderRadius: '8px',
  width: '120px',
  padding: '5px 0',
};

export const dotIconStyles = {
  cursor: 'pointer',
  width: '25px',
  objectFit: 'contain',
};

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
