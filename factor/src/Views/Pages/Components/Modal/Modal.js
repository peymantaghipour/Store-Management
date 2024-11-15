const Modal = (props) => {
    return (
        <div className="modal" style={{ display: props.show ? "block" : "none" }}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => { if (props.hide) { props.hide() } }}>&times;</span>
                    <h2>{props.header} </h2>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                {
                    props.footer ?
                        <div className="modal-footer">
                            {props.footer}
                        </div>
                        : <></>
                }
            </div>
        </div>

    )
}

export default Modal;