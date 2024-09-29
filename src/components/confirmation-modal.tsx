import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"

interface Props {
  isOpen: boolean
  title: string
  message: string
  primaryAction: () => void
  secondaryAction: () => void
  primaryText: string
  secondaryText: string
  onChange: () => void
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  primaryAction,
  secondaryAction,
  primaryText,
  secondaryText,
  onChange
}: Props) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-end space-x-2 w-full">
                <Button fullWidth variant="flat" onClick={secondaryAction || onClose}>{secondaryText || 'Batal'}</Button>
                <Button fullWidth color="primary" onClick={primaryAction}>{primaryText}</Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal;