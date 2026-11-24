import Modal from './Modal.jsx'
import Button from '../atoms/Button.jsx'
import Icon from '../atoms/Icon.jsx'

/** Dialog konfirmasi untuk aksi berbahaya (hapus). */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Hapus',
  cancelLabel = 'Batal',
  busy = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel} size="sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-danger">
          <Icon name="trash" size={22} />
        </span>
        <p className="text-sm leading-relaxed text-muted">{message}</p>
        <div className="grid w-full grid-cols-2 gap-3">
          <Button variant="social" size="sm" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} disabled={busy}>
            {busy ? 'Menghapus...' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
