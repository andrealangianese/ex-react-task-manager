import { createPortal } from "react-dom"

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {
    // se show è falso non devo fare niente
    if (!show) return null
    return createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    {content}
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Annulla</button>
                    <button className="btn-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        // serve per inserire la modale direttamente nel body
        document.body
    )

}